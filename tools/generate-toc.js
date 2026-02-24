import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import {
  extractFirstParagraph,
  walkArticles,
  DIST_DIR
} from './common.js';

const OUTPUT_FILE = path.join(DIST_DIR, 'toc.md');

const generateToc = async () => {
  let toc = '<!-- This file is auto-generated. Do not edit it manually. -->\n\n';
  toc += '# ToC\n\n';

  let lastCat = null;
  let lastSubDir = null;

  await walkArticles(async ({ cat, catLabel, subDir, subDirLabel, article, content }) => {
    if (cat.name !== lastCat) {
      toc += `## ${catLabel}\n\n`;
      lastCat = cat.name;
      lastSubDir = null;
    }

    if (subDir.name !== lastSubDir) {
      toc += `### ${subDirLabel}\n\n`;
      lastSubDir = subDir.name;
    }

    const paragraph = extractFirstParagraph(content);
    if (paragraph) {
      const relPath = `../src/${cat.name}/${subDir.name}/${article.name}`;
      toc += `- <a id="${article.slug}" name="${article.slug}" href="#${article.slug}">#</a> ${paragraph} [more](${relPath})\n`;
    }
  });

  if (toc) {
    const outputContent = toc.trim() + '\n';
    await writeFile(OUTPUT_FILE, outputContent);
    console.log(`Successfully generated TOC at ${OUTPUT_FILE}`);
  } else {
    console.warn('No articles found to generate TOC.');
  }
};

generateToc().catch(err => {
  console.error('Error generating TOC:', err);
  process.exit(1);
});
