const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');

const config = {
  entry: {
    'react-sortable-tree': './src/index',
  },
  output: {
    path: path.join(__dirname, 'dist', 'umd'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ReactSortableTree',
  },
  resolve: {
    extensions: ['', '.js'],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      beautify: true,
      comments: true,
    }),
  ],
  postcss: [autoprefixer({ browsers: ['IE >= 9', 'last 2 versions', '> 1%'] })],
  externals: [
    nodeExternals({
      // load non-javascript files with extensions, presumably via loaders
      whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i],
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader?insertAt=top',
          'css-loader?modules&-autoprefixer&importLoaders=1&localIdentName=rst__[local]',
          'postcss-loader',
          'sass-loader',
        ],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader?insertAt=top',
          'css-loader?-autoprefixer',
          'postcss-loader',
        ],
      },
    ],
  },
};

const target = process.env.TARGET || 'umd';

switch (target) {
case 'umd':
  // config
  break;
default:
}

module.exports = config;
