import webpack from 'webpack';
const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'public'),
  assets: 'assets/',
  publicPath: '/'
};

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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PUBLIC_URL: JSON.stringify(publicUrl)
      }
    })
  ]
};
