import { writeFile, mkdir, rm, readFile } from 'fs/promises';
import path from 'path';
import {
  extractH1,
  extractFirstParagraph,
  extractFrontMatter,
  walkArticles,
  AI_RULES_DIR,
} from './common.js';

const { repository } = JSON.parse(await readFile('./package.json', 'utf-8'));
const GITHUB_BASE = `${repository}/blob/main/src`;
const SHORT = process.argv.includes('--short');

const generate = async () => {
  console.log(`Generating ai/rules${SHORT ? ' (short)' : ''}...`);

  await rm(AI_RULES_DIR, { recursive: true, force: true });
  await mkdir(AI_RULES_DIR, { recursive: true });

  let count = 0;
  const groupedRules = {};

  await walkArticles(
    async ({
      cat,
      subDir,
      article,
      content,
      catLabel,
      subDirLabel,
      subDirGlobs,
    }) => {
      const fm = extractFrontMatter(content);
      if (fm.aiSkip === true) return;

      const title = extractH1(content);
      const summary = extractFirstParagraph(content);

      if (title && summary) {
        const groupKey = `${cat.name}/${subDir.name}`;
        if (!groupedRules[groupKey]) {
          groupedRules[groupKey] = {
            cat,
            subDir,
            catLabel,
            subDirLabel,
            subDirGlobs,
            rules: [],
          };
        }
        groupedRules[groupKey].rules.push({
          title,
          summary,
          slug: article.slug,
        });
      }
    },
  );

  for (const groupKey in groupedRules) {
    const group = groupedRules[groupKey];
    const groupDir = path.join(AI_RULES_DIR, group.cat.name);
    await mkdir(groupDir, { recursive: true });

    const heading = `${group.catLabel}: ${group.subDirLabel}`;
    const serializeGlobs = (g) =>
      Array.isArray(g)
        ? `\n${g.map((s) => `  - "${s}"`).join('\n')}`
        : ` "${g}"`;
    const globsLine = group.subDirGlobs
      ? `\nglobs:${serializeGlobs(group.subDirGlobs)}`
      : '';
    let fileContent = `---\ndescription: "${heading}"${globsLine}\n---\n\n`;

    if (!SHORT) {
      fileContent += `# ${heading}\n`;
    }

    for (const rule of group.rules) {
      const url = `${GITHUB_BASE}/${group.cat.name}/${group.subDir.name}/${rule.slug}.md`;
      fileContent += SHORT
        ? `- **${rule.title}**: ${rule.summary}\n`
        : `\n## ${rule.title}\n${rule.summary}\n[read more](${url})\n`;
    }

    await writeFile(
      path.join(groupDir, `${group.subDir.name}.md`),
      fileContent,
    );
    count += group.rules.length;
  }

  console.log(`Generated ${count} rules into ai/rules`);
};

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
