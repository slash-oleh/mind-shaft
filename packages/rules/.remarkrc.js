import baseConfig from '../../.remarkrc.js';
import articlePlugin from './bin/remark-plugin-article.js';

const remarkConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    [articlePlugin, {
      sections: {
        // Some articles are general and non-programming
        goodSolution: { checkCode: false },
        badSolution: { checkCode: false },
        // Many articles still don't have references
        references: { required: false }
      }
    }]
  ]
};

export default remarkConfig;
