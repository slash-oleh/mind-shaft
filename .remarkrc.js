import recommended from 'remark-preset-lint-recommended';
import noConsecutiveBlankLines from 'remark-lint-no-consecutive-blank-lines';
import noMissingBlankLines from 'remark-lint-no-missing-blank-lines';
import listItemSpacing from 'remark-lint-list-item-spacing';
import articlePlugin from './tools/remark-plugin-article.js';

const remarkConfig = {
  settings: {
    bullet: '-',
    emphasis: '*',
    strong: '*'
  },
  plugins: [
    recommended,
    [articlePlugin, {
      sections: {
        // Some articles are general and non-programming
        goodSolution: { checkCode: false },
        badSolution: { checkCode: false },
        // Many articles still don't have references
        references: { required: false }
      }
    }],
    noConsecutiveBlankLines,
    noMissingBlankLines,
    listItemSpacing
  ]
};

export default remarkConfig;
