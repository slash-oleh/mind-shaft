import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import {
  extractH1,
  extractFirstParagraph,
  extractSolutions,
  getProjectName,
  walkArticles,
  DIST_DIR
} from './common.js';

const ANTIGRAVITY_DIST = path.join(DIST_DIR, 'antigravity');
const ANTIGRAVITY_RULES_DIR = path.join(ANTIGRAVITY_DIST, '.agents', 'rules');

const generateRules = async () => {
  const projectName = await getProjectName();
  const rulesGroupDir = path.join(ANTIGRAVITY_RULES_DIR, projectName);

  console.log(`Generating Antigravity rules for project "${projectName}"...`);

  await mkdir(rulesGroupDir, { recursive: true });

  let count = 0;

  await walkArticles(async ({ cat, subDir, article, content }) => {
    const title = extractH1(content);
    const summary = extractFirstParagraph(content);
    const solutions = extractSolutions(content);

    if (title && summary) {
      const ruleDir = path.join(rulesGroupDir, cat.name, subDir.name);
      await mkdir(ruleDir, { recursive: true });

      const ruleFile = `${article.slug}.md`;
      let ruleContent = `---\ntrigger: always_on\n---\n\n# ${title}\n\n${summary}`;

      if (solutions.good) {
        ruleContent += `\n\n## Good Solution\n\n${solutions.good}`;
      }
      if (solutions.bad) {
        ruleContent += `\n\n## Bad Solution\n\n${solutions.bad}`;
      }

      await writeFile(path.join(ruleDir, ruleFile), ruleContent);
      count++;
    }
  });

  console.log(`Successfully generated ${count} rules with examples in ${ANTIGRAVITY_DIST}`);
};

generateRules().catch(err => {
  console.error('Error generating Antigravity rules:', err);
  process.exit(1);
});
