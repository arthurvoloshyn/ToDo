const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: baseConfig.externals.publicUrl,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main;

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles
        };
      }
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/, /\.htaccess/, /\.DS_Store/],
      importWorkboxFrom: 'cdn',
      navigateFallback: `${baseConfig.externals.publicUrl}/index.html`,
      navigateFallbackBlacklist: [new RegExp('^/_'), new RegExp('/[^/?]+\\.[^/]+$')]
    })
  ]
});
