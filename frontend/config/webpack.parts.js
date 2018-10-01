const webpack = require('webpack');
const path = require('path');

const {
  PATHS,
  API_URL,
} = require('./constants');

exports.setGlobalVariables = (target, override = {}) => ({
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        NODE_ENV: JSON.stringify(target),
      },
      API_URL: JSON.stringify(API_URL),
      PRODUCTION: JSON.stringify(target === 'production'),
      DEBUG: JSON.stringify(target !== 'production'),
    }, override)),
  ],
});

// TODO: NEED TO DEFINE SAME ALIASES FOR jest TO WORK
// IN package.json
exports.resolveProjectDependencies = {
  resolve: {
    modules: [
      PATHS.app,
      PATHS.node,
    ],
    alias: {
      Assets: PATHS.Assets,
      Styles: PATHS.Styles,
      '@Components': path.resolve(__dirname, '..', 'source', 'app', 'components'),
      '@Helpers': path.resolve(__dirname, '..', 'source', 'app', 'helpers'),
      '@Redux': path.resolve(__dirname, '..', 'source', 'app', 'redux'),
      '@Routes': path.resolve(__dirname, '..', 'source', 'app', 'routes'),
      '@Styled': path.resolve(__dirname, '..', 'source', 'app', 'styled'),
      '@Ui': path.resolve(__dirname, '..', 'source', 'app', 'ui'),
      '@Utils': path.resolve(__dirname, '..', 'source', 'app', 'utils'),
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
};


exports.loadImages = ({ include, exclude } = {}) => ({
  module: {
    rules: [{
      test: /\.(png|jpg|svg|ico)$/,
      include,
      exclude,

      use: {
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: 8192,
          name: '[name]-[hash].[ext]',

          publicPath: '/_next/static/images/',
          outputPath: 'static/images/',
        },
      },
    }],
  },
});

