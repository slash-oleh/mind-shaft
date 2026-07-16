#!/usr/bin/env node
import { createWriteStream, cpSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { spawnSync } from "node:child_process";
import { x as extractTar } from "tar";

const REPO = "slash-oleh/mind-shaft";
const DEFAULT_TARGETS = ["claudecode"];

function parseArgs(argv) {
  const opts = { targets: DEFAULT_TARGETS, ref: "main" };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--target" || arg === "-t") opts.targets = argv[++i].split(",");
    else if (arg === "--ref" || arg === "-r") opts.ref = argv[++i];
    else if (arg === "--help" || arg === "-h") opts.help = true;
  }
  return opts;
}

function printHelp() {
  console.log(`Usage: npx slash-oleh/mind-shaft [options]

Installs mind-shaft rules and skills into the current project.
Downloads content as a tarball (one request), then runs rulesync generate
to produce per-tool output.

Options:
  -t, --target <tools>  Comma-separated rulesync targets (default: ${DEFAULT_TARGETS.join(",")})
                        See: npx rulesync generate --help
  -r, --ref <ref>        Git ref to install from (default: main)
  -h, --help             Show this help
`);
}

async function downloadSource(ref, destDir) {
  const url = `https://codeload.github.com/${REPO}/tar.gz/${ref}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }

  const tarPath = join(destDir, "source.tar.gz");
  await pipeline(Readable.fromWeb(res.body), createWriteStream(tarPath));

  await extractTar({
    file: tarPath,
    cwd: destDir,
    strip: 1,
    filter: (path) => path.includes("/ai/rules/") || path.includes("/ai/skills/"),
  });

  rmSync(tarPath);
}

function generate(targets, inputRoot) {
  // --config points at a path that never exists so a consumer project's own
  // rulesync.jsonc (e.g. delete: true, different targets) can't leak in here.
  const result = spawnSync(
    "npx",
    [
      "--yes",
      "rulesync",
      "generate",
      "-t",
      targets.join(","),
      "-f",
      "rules,skills",
      "--input-root",
      inputRoot,
      "--config",
      join(inputRoot, "unused-rulesync-config.jsonc"),
    ],
    { stdio: "inherit" },
  );
  if (result.status !== 0) {
    throw new Error(`rulesync generate failed (exit ${result.status})`);
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    printHelp();
    return;
  }

  const tmp = mkdtempSync(join(tmpdir(), "mind-shaft-"));
  try {
    await downloadSource(opts.ref, tmp);
    cpSync(join(tmp, "ai/rules"), join(tmp, ".rulesync/rules"), { recursive: true });
    cpSync(join(tmp, "ai/skills"), join(tmp, ".rulesync/skills"), { recursive: true });
    generate(opts.targets, tmp);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  console.log(`Installed mind-shaft rules and skills for: ${opts.targets.join(", ")}`);
}

await main();
