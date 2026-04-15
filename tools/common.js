import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { toString } from 'mdast-util-to-string';
import { readFile, readdir } from 'fs/promises';
import path from 'path';

export const SRC_DIR = './src';
export const DIST_DIR = './dist';
export const AI_RULES_DIR = './ai/rules';
export const IGNORE_FILES = ['README.md'];
export const EXCLUDE_DIRS = ['home'];

/**
 * Reads the project name from package.json.
 */
export const getProjectName = async () => {
  try {
    const pkg = JSON.parse(await readFile('./package.json', 'utf-8'));
    return pkg.name || 'imported';
  } catch {
    return 'imported';
  }
};

/**
 * Traverses the SRC_DIR to find all markdown articles, grouped by category and subdirectory.
 */
export const getArticlesStructure = async () => {
  const categories = (await readdir(SRC_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory() && !EXCLUDE_DIRS.includes(d.name))
    .map((d) => d.name)
    .sort();

  const structure = [];

  for (const category of categories) {
    const catPath = path.join(SRC_DIR, category);
    let subDirs;
    try {
      subDirs = (await readdir(catPath, { withFileTypes: true }))
        .filter((d) => d.isDirectory())
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      continue;
    }

    if (subDirs.length === 0) continue;

    const catData = {
      name: category,
      path: catPath,
      subDirs: [],
    };

    for (const subDir of subDirs) {
      const subDirPath = path.join(catPath, subDir.name);
      const articles = (await readdir(subDirPath, { withFileTypes: true }))
        .filter(
          (f) =>
            f.isFile() &&
            f.name.endsWith('.md') &&
            !IGNORE_FILES.includes(f.name),
        )
        .sort((a, b) => a.name.localeCompare(b.name));

      if (articles.length === 0) continue;

      catData.subDirs.push({
        name: subDir.name,
        path: subDirPath,
        articles: articles.map((f) => ({
          name: f.name,
          slug: f.name.replace(/\.md$/, ''),
          path: path.join(subDirPath, f.name),
        })),
      });
    }

    if (catData.subDirs.length > 0) {
      structure.push(catData);
    }
  }
  return structure;
};

/**
 * Iterates over all articles and executes a callback for each one with full context.
 */
export const walkArticles = async (callback) => {
  const structure = await getArticlesStructure();
  for (const cat of structure) {
    const catLabel = await getLabel(cat.path, formatName(cat.name));
    for (const subDir of cat.subDirs) {
      const subDirLabel = await getLabel(subDir.path, formatName(subDir.name));
      for (const article of subDir.articles) {
        const content = await readFile(article.path, 'utf-8');
        await callback({
          cat,
          catLabel,
          subDir,
          subDirLabel,
          article,
          content,
        });
      }
    }
  }
};

export const parser = unified().use(remarkParse);
export const stringifier = unified().use(remarkStringify);

/**
 * Extracts the H1 title from a markdown file content.
 */
export const extractH1 = (content) => {
  const tree = parser.parse(content);
  const h1 = tree.children.find((n) => n.type === 'heading' && n.depth === 1);
  return h1 ? toString(h1) : null;
};

/**
 * Capitalizes the first letter and replaces hyphens with spaces.
 */
export const formatName = (s) => {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');
};

/**
 * Tries to read the H1 from README.md in a directory, otherwise formats the name.
 */
export const getLabel = async (dirPath, fallback) => {
  try {
    const readmePath = path.join(dirPath, 'README.md');
    const content = await readFile(readmePath, 'utf-8');
    return extractH1(content) || fallback;
  } catch {
    return fallback;
  }
};

/**
 * Extracts all paragraphs from the "TLDR" section using raw content slicing.
 */
export const extractFirstParagraph = (content) => {
  const tree = parser.parse(content);
  const children = tree.children;

  // Find the TLDR section
  const tldrHeading = children.find(
    (n) =>
      n.type === 'heading' &&
      n.depth === 2 &&
      toString(n).toLowerCase() === 'tldr',
  );
  if (tldrHeading) {
    const tldrIndex = children.indexOf(tldrHeading);
    const nextNodes = children.slice(tldrIndex + 1);
    const nextHeadingIndex = nextNodes.findIndex(
      (n) => n.type === 'heading' && n.depth === 2,
    );
    const sectionNodes =
      nextHeadingIndex === -1
        ? nextNodes
        : nextNodes.slice(0, nextHeadingIndex);

    const paragraphs = sectionNodes.filter((n) => n.type === 'paragraph');
    if (paragraphs.length > 0) {
      const start = paragraphs[0].position.start.offset;
      const end = paragraphs[paragraphs.length - 1].position.end.offset;
      return content.slice(start, end).trim();
    }
  }

  return null;
};

/**
 * Extracts impact items from the "Impact" section.
 */
export const extractImpactItems = (content) => {
  const tree = parser.parse(content);
  const children = tree.children;

  const impactHeading = children.find(
    (n) =>
      n.type === 'heading' &&
      n.depth === 2 &&
      toString(n).toLowerCase() === 'impact',
  );
  if (!impactHeading) return [];

  const impactIndex = children.indexOf(impactHeading);
  const nextNodes = children.slice(impactIndex + 1);
  const nextHeadingIndex = nextNodes.findIndex(
    (n) => n.type === 'heading' && n.depth === 2,
  );
  const sectionNodes =
    nextHeadingIndex === -1 ? nextNodes : nextNodes.slice(0, nextHeadingIndex);

  const impactList = sectionNodes.find((n) => n.type === 'list');
  if (!impactList) return [];

  const attributes = [];
  for (const item of impactList.children) {
    const paragraph = item.children.find((c) => c.type === 'paragraph');
    if (paragraph) {
      const strong = paragraph.children.find((c) => c.type === 'strong');
      if (strong) {
        attributes.push(toString(strong).trim());
      }
    }
  }
  return [...new Set(attributes)];
};

/**
 * Extracts the "Good Solution" and "Bad Solution" sections using raw content slicing.
 */
export const extractSolutions = (content) => {
  const tree = parser.parse(content);
  const children = tree.children;

  const result = {
    good: null,
    bad: null,
  };

  const sections = ['Good Solution', 'Bad Solution'];

  for (const sectionName of sections) {
    const heading = children.find(
      (n) =>
        n.type === 'heading' &&
        n.depth === 2 &&
        toString(n).toLowerCase() === sectionName.toLowerCase(),
    );
    if (heading) {
      const index = children.indexOf(heading);
      const nextNodes = children.slice(index + 1);
      const nextHeadingIndex = nextNodes.findIndex(
        (n) => n.type === 'heading' && n.depth === 2,
      );
      const sectionNodes =
        nextHeadingIndex === -1
          ? nextNodes
          : nextNodes.slice(0, nextHeadingIndex);

      if (sectionNodes.length > 0) {
        const start = sectionNodes[0].position.start.offset;
        const end = sectionNodes[sectionNodes.length - 1].position.end.offset;
        const key = sectionName === 'Good Solution' ? 'good' : 'bad';
        result[key] = content.slice(start, end).trim();
      }
    }
  }

  return result;
};
