const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@core': path.resolve(__dirname, 'src/core'),
    '@modules': path.resolve(__dirname, 'src/modules'),
    '@shared': path.resolve(__dirname, 'src/shared'),
  })
);