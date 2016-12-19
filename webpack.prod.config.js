const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin('all.css');

module.exports = {
  entry: {
    all: __dirname + '/source/javascripts/index.js',
  },
  resolve: {
    root: __dirname + '/source/javascripts',
  },
  output: {
    path: __dirname + '/.tmp/webpack_output',
    filename: '/javascripts/[name].js'
  },
  module: {
    loaders: [
      {
        test: /.*\.sass$/,
        loader: extractSass.extract(['css', 'sass', 'import-glob'])
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['es2015'] }
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
    }),
  ]
};

