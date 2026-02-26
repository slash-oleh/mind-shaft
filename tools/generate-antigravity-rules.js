import { writeFile, mkdir, rm } from 'fs/promises';
import path from 'path';
import {
  extractH1,
  extractFirstParagraph,
  getProjectName,
  walkArticles,
  DIST_DIR
} from './common.js';

const ANTIGRAVITY_DIST = path.join(DIST_DIR, 'antigravity');
const ANTIGRAVITY_AGENTS_DIR = path.join(ANTIGRAVITY_DIST, '.agents');
const ANTIGRAVITY_RULES_DIR = path.join(ANTIGRAVITY_AGENTS_DIR, 'rules');
const ANTIGRAVITY_REFS_DIR = path.join(ANTIGRAVITY_AGENTS_DIR, 'refs');

const generateRules = async () => {
  const projectName = await getProjectName();
  const rulesGroupDir = path.join(ANTIGRAVITY_RULES_DIR, projectName);
  const refsGroupDir = path.join(ANTIGRAVITY_REFS_DIR, projectName);

  console.log(`Generating Antigravity rules...`);

  // Clean up old rules and refs
  await rm(rulesGroupDir, { recursive: true, force: true });
  await rm(refsGroupDir, { recursive: true, force: true });
  
  await mkdir(rulesGroupDir, { recursive: true });
  await mkdir(refsGroupDir, { recursive: true });

  let count = 0;
  const groupedRules = {};

  await walkArticles(async ({ cat, subDir, article, content, catLabel, subDirLabel }) => {
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
          rules: []
        };
      }
      
      // We push the necessary info for the index file
      groupedRules[groupKey].rules.push({
        title,
        summary,
        slug: article.slug,
        originalContent: content // Keep original content to copy as reference
      });
    }
  });

  // Now, generate the grouped files and copy references
  for (const groupKey in groupedRules) {
    const group = groupedRules[groupKey];
    
    // Directory for the grouped index file
    const catDir = path.join(rulesGroupDir, group.cat.name);
    await mkdir(catDir, { recursive: true });
    
    // Directory for the copied reference articles
    const refDir = path.join(refsGroupDir, group.cat.name, group.subDir.name);
    await mkdir(refDir, { recursive: true });

    const indexFile = `${group.subDir.name}.md`;
    let indexContent = `---\ntrigger: always_on\n---\n\n# ${group.catLabel}: ${group.subDirLabel}\n`;

    for (const rule of group.rules) {
      // Append to the index content
      // Link goes from .agents/rules/projectName/category/subcategory.md
      // To .agents/refs/projectName/category/subcategory/rule.md
      // path: ../../../../refs/projectName/category/subcategory/rule.md
      const relRefPath = `../../../../refs/${projectName}/${group.cat.name}/${group.subDir.name}/${rule.slug}.md`;
      indexContent += `\n## ${rule.title}\n**TLDR:** ${rule.summary}\n**Reference:** [read more](${relRefPath})\n`;
      
      // Copy the original source article to the refs directory
      await writeFile(path.join(refDir, `${rule.slug}.md`), rule.originalContent);
      count++;
    }

    await writeFile(path.join(catDir, indexFile), indexContent);
  }

  console.log(`Successfully generated ${count} rules with examples in ${ANTIGRAVITY_DIST}`);
};

generateRules().catch(err => {
  console.error('Error generating Antigravity rules:', err);
  process.exit(1);
});
