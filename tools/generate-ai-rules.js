import { writeFile, mkdir, rm, readFile } from 'fs/promises';
import path from 'path';
import {
  extractH1,
  extractFirstParagraph,
  walkArticles,
  AI_RULES_DIR,
} from './common.js';

const { repository } = JSON.parse(await readFile('./package.json', 'utf-8'));
const GITHUB_BASE = `${repository}/blob/main/src`;

const generate = async () => {
  console.log('Generating ai/rules...');

  await rm(AI_RULES_DIR, { recursive: true, force: true });
  await mkdir(AI_RULES_DIR, { recursive: true });

  let count = 0;
  const groupedRules = {};

  await walkArticles(
    async ({ cat, subDir, article, content, catLabel, subDirLabel }) => {
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
    let fileContent = `---\ndescription: "${heading}"\n---\n\n# ${heading}\n`;

    for (const rule of group.rules) {
      const url = `${GITHUB_BASE}/${group.cat.name}/${group.subDir.name}/${rule.slug}.md`;
      fileContent += `\n## ${rule.title}\n${rule.summary}\n[read more](${url})\n`;
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
