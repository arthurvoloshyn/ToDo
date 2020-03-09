const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../public'),
  assets: 'assets/',
  publicPath: '/'
};

const PAGES_DIR = PATHS.src;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html')); // eslint-disable-line

const publicUrl = PATHS.publicPath.slice(0, -1);

module.exports = {
  externals: {
    paths: PATHS,
    publicUrl
  },
  entry: {
    index: PATHS.src
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: PATHS.publicPath
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PUBLIC_URL: JSON.stringify(publicUrl)
      }
    })
  ]
};
