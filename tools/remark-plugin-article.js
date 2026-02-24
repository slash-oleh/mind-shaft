import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import path from 'path';

const warn = (file, message, position, key, settings, configKey) => {
  const isEnabled = configKey
    ? settings.sections?.[configKey]?.[key]
    : settings.global?.[key];
  if (isEnabled !== false) {
    file.message(message, position);
  }
};

/**
 * Converts a title to a filename-friendly slug.
 */
const toFileName = (title) =>
  title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + '.md';

const validateProblem = (nodes, file, headingNode, settings) => {
  if (!nodes.some(n => n.type === 'paragraph')) {
    warn(file, 'Section "## Problem" must contain at least one paragraph', headingNode.position, 'checkParagraph', settings, 'problem');
  }
};

const validateSolution = (nodes, file, headingNode, title, configKey, settings) => {
  const hasParagraph = nodes.some(n => n.type === 'paragraph');
  const codeBlocks = nodes.filter(n => n.type === 'code');
  if (!hasParagraph) {
    warn(file, `Section "## ${title}" must contain a description paragraph`, headingNode.position, 'checkParagraph', settings, configKey);
  }
  if (codeBlocks.length) {
    warn(file, `Section "## ${title}" must contain at least one code block`, headingNode.position, 'checkCode', settings, configKey);
  }
};

const validateGoodSolution = (nodes, file, headingNode, settings) => {
  validateSolution(nodes, file, headingNode, 'Good solution', 'goodSolution', settings);
};

const validateBadSolution = (nodes, file, headingNode, settings) => {
  validateSolution(nodes, file, headingNode, 'Bad solution', 'badSolution', settings);
};

const validateImpact = (nodes, file, headingNode, settings) => {
  const nonListNodes = nodes.filter(n => n.type !== 'list');
  if (nonListNodes.length > 0) {
    warn(file, 'Section "## Impact" must contain only a list', headingNode.position, 'checkOnlyList', settings, 'impact');
  }
  const list = nodes.find(n => n.type === 'list');
  if (!list) {
    warn(file, 'Section "## Impact" must contain a list', headingNode.position, 'checkList', settings, 'impact');
  } else {
    list.children.forEach(item => {
      const paragraph = item.children.find(c => c.type === 'paragraph');
      if (!paragraph) {
        warn(file, '"Impact" list items must contain text', item.position, 'checkListItemText', settings, 'impact');
        return;
      }
      const [firstChild, secondChild] = paragraph.children;
      const isBold = firstChild?.type === 'strong';
      const hasLinkInBold = isBold && firstChild.children.some(c =>
        c.type === 'link' && c.url.includes('impact')
      );
      const hasColonAfter = secondChild && secondChild.type === 'text' && secondChild.value.startsWith(': ');
      if (!hasLinkInBold || !hasColonAfter) {
        warn(file, '"Impact" list items must follow the format: "**[Impact](../../home/impact/...md)**: description"', item.position, 'checkListItemFormat', settings, 'impact');
      }
    });
  }
};

const validateListOnly = (nodes, file, headingNode, title, configKey, settings) => {
  if (nodes.length !== 1 || nodes[0].type !== 'list') {
    warn(file, `Section "## ${title}" must contain only a list`, headingNode.position, 'checkOnlyList', settings, configKey);
  }
};


const validateExceptions = (nodes, file, headingNode, settings) => {
  validateListOnly(nodes, file, headingNode, 'Exceptions', 'exceptions', settings);
};

const validateReferences = (nodes, file, headingNode, settings) => {
  if (nodes.length !== 1 || nodes[0].type !== 'list') {
    warn(file, 'Section "## References" must contain only a list', headingNode.position, 'checkOnlyList', settings, 'references');
  } else {
    const list = nodes[0];
    list.children.forEach(item => {
      const paragraph = item.children.find(c => c.type === 'paragraph');
      if (!paragraph) {
        warn(file, '"References" list items must contain a link', item.position, 'checkLink', settings, 'references');
        return;
      }
      const link = paragraph.children.find(c => c.type === 'link');
      const hasOtherContent = paragraph.children.some(c =>
        (c.type === 'text' && c.value.trim() !== '') || (c.type !== 'text' && c !== link)
      );
      if (!link) {
        warn(file, '"References" list items must contain a link', item.position, 'checkLink', settings, 'references');
      } else if (hasOtherContent) {
        warn(file, '"References" list items must contain only a link', item.position, 'checkOnlyLink', settings, 'references');
      } else {
        const linkText = toString(link);
        if (!linkText.includes(': ')) {
          warn(file, `"References" link text "${linkText}" must follow the format: "[Source: Title by Author]"`, item.position, 'checkFormat', settings, 'references');
        }
        const isExternal = /^(https?:\/\/|mailto:)/i.test(link.url);
        const isMarkdown = link.url.includes('.md');
        if (!isExternal && isMarkdown) {
          warn(file, 'Do not reference other internal articles in the "References" section', item.position, 'checkInternal', settings, 'references');
        }
      }
    });
  }
};


const checkGlobalPlaceholders = (tree, file, settings) => {
  visit(tree, (node) => {
    // Skip code blocks
    if (node.type === 'code') return;

    // Check for template placeholders {{ }} in text nodes and inline code
    if (node.type === 'text' || node.type === 'inlineCode') {
      if (node.value.includes('{{') || node.value.includes('}}')) {
        warn(file, 'Article contains template placeholders ({{ }})', node.position, 'checkPlaceholders', settings);
      }
    }

    // Check for placeholder "..." in list items
    if (node.type === 'listItem') {
      if (toString(node).trim() === '...') {
        warn(file, 'Remove placeholder "..." from lists', node.position, 'checkEllipsisPlaceholder', settings);
      }
    }
  });
};

const checkH1 = (children, filePath, file, settings) => {
  const h1 = children.find(n => n.type === 'heading' && n.depth === 1);
  if (!h1) {
    warn(file, 'Missing required H1 title', children[0]?.position, 'checkH1Exists', settings);
    return;
  }
  const h1Index = children.indexOf(h1);
  const title = toString(h1);
  const expectedFileName = toFileName(title);
  const actualFileName = path.basename(filePath);
  if (actualFileName !== expectedFileName) {
    warn(file, `Filename "${actualFileName}" should match hyphenated title "${expectedFileName}"`, h1.position, 'checkFileNameMatch', settings);
  }
  const description = children[h1Index + 1];
  if (!description || description.type !== 'paragraph') {
    warn(file, 'H1 title must be followed by a description paragraph', h1.position, 'checkH1Description', settings);
  }
};

const checkH2Sections = (children, file, tree, settings) => {
  const h2s = children.filter(n => n.type === 'heading' && n.depth === 2);
  const h2Titles = h2s.map(h => toString(h));
  const sectionEntries = Object.entries(settings.sections);
  const titleToKey = Object.fromEntries(sectionEntries.map(([key, { title }]) => [title, key]));
  const allowedTitles = Object.keys(titleToKey);

  // 1. Report missing required sections
  sectionEntries.forEach(([configKey, { title, required }]) => {
    if (required && !h2Titles.includes(title)) {
      warn(file, `Missing required section: "## ${title}"`, tree.position, 'checkMissingSections', settings);
    }
  });

  // 2. Report unexpected extra sections
  h2s.forEach(node => {
    const title = toString(node);
    if (!allowedTitles.includes(title)) {
      warn(file, `Unexpected section: "## ${title}"`, node.position, 'checkUnexpectedSections', settings);
    }
  });

  // 3. Check for specific order and validate content
  // We only check order for sections that are actually present
  let lastAllowedIndex = -1;
  h2s.forEach((node) => {
    const title = toString(node);
    const configKey = titleToKey[title];
    if (!configKey) return; // Unexpected section, already reported

    const allowedIndex = allowedTitles.indexOf(title);
    if (allowedIndex < lastAllowedIndex) {
      warn(file, `Section "## ${title}" is in the wrong position`, node.position, 'checkSectionOrder', settings);
    }
    lastAllowedIndex = allowedIndex;

    // Validate content
    const startIndex = children.indexOf(node) + 1;
    const nextH2 = children.slice(startIndex).find(n => n.type === 'heading' && n.depth === 2);
    const endIndex = nextH2 ? children.indexOf(nextH2) : children.length;
    const sectionNodes = children.slice(startIndex, endIndex);

    if (sectionNodes.length === 0) {
      warn(file, `Section "## ${title}" is empty`, node.position, 'checkEmptySections', settings);
    } else {
      const { validate } = settings.sections[configKey];
      if (validate) {
        validate(sectionNodes, file, node, settings);
      }
    }
  });
};


const DEFAULT_SETTINGS = {
  sections: {
    problem: {
      title: 'Problem',
      required: true,
      validate: validateProblem,
      checkParagraph: true,
    },
    goodSolution: {
      title: 'Good solution',
      required: true,
      validate: validateGoodSolution,
      checkParagraph: true,
      checkCode: true,
    },
    badSolution: {
      title: 'Bad solution',
      required: true,
      validate: validateBadSolution,
      checkParagraph: true,
      checkCode: true,
    },
    impact: {
      title: 'Impact',
      required: true,
      validate: validateImpact,
      checkOnlyList: true,
      checkList: true,
      checkListItemText: true,
      checkListItemFormat: true,
    },
    exceptions: {
      title: 'Exceptions',
      required: true,
      validate: validateExceptions,
      checkOnlyList: true,
    },
    references: {
      title: 'References',
      required: true,
      validate: validateReferences,
      checkOnlyList: true,
      checkLink: true,
      checkOnlyLink: true,
      checkFormat: true,
      checkInternal: true,
    },
  },
  global: {
    checkPlaceholders: true,
    checkEllipsisPlaceholder: true,
    checkH1Exists: true,
    checkFileNameMatch: true,
    checkH1Description: true,
    checkMissingSections: true,
    checkUnexpectedSections: true,
    checkSectionOrder: true,
    checkEmptySections: true
  }
};

const remarkArticleStructure = (options = {}) => (tree, file) => {
  const sections = Object.fromEntries(
    Object.entries(DEFAULT_SETTINGS.sections).map(([configKey, defaultConfig]) => [
      configKey,
      { ...defaultConfig, ...options.sections?.[configKey] }
    ])
  );

  const settings = {
    ...DEFAULT_SETTINGS,
    ...options,
    sections,
    global: { ...DEFAULT_SETTINGS.global, ...options.global }
  };
  const filePath = file.path || '';
  if (filePath.endsWith('README.md') || filePath.includes('impact')) return;

  const children = tree.children.filter(n => n.type !== 'html' || !n.value.startsWith('<!--'));

  checkGlobalPlaceholders(tree, file, settings);
  checkH1(children, filePath, file, settings);
  checkH2Sections(children, file, tree, settings);
};

export default remarkArticleStructure;
