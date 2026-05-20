import baseConfig from '../../.remarkrc.js';


const remarkConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins
  ]
};

export default remarkConfig;
