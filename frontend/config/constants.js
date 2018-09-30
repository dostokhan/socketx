const path = require('path');

const PATHS = {
  root: path.join(__dirname),
  source: path.join(__dirname, '../source'),
  app: path.join(__dirname, '../source/app'),
  build: path.join(__dirname, '../build'),
  node: path.join(__dirname, '../node_modules'),

  Assets: path.join(__dirname, '../source/assets'),
  Styles: path.join(__dirname, '../source/styles'),

};

exports.PATHS = PATHS;
