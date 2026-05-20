import recommended from 'remark-preset-lint-recommended';
import noConsecutiveBlankLines from 'remark-lint-no-consecutive-blank-lines';
import noMissingBlankLines from 'remark-lint-no-missing-blank-lines';
import listItemSpacing from 'remark-lint-list-item-spacing';

const remarkConfig = {
  settings: {
    bullet: '-',
    emphasis: '*',
    strong: '*',
  },
  plugins: [
    recommended,
    noConsecutiveBlankLines,
    [noMissingBlankLines, { exceptTightLists: true }],
    listItemSpacing,
  ],
};

export default remarkConfig;
