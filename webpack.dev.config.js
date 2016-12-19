const webpack = require('webpack');

module.exports = {
  entry: {
    all: __dirname + '/source/javascripts/index.js',
  },
  resolve: {
    root: __dirname + '/source/javascripts'
  },
  output: {
    path: __dirname + '/.tmp/webpack_output',
    filename: 'javascripts/[name].js'
  },
  module: {
    loaders: [
      {
        test: /.*\.sass$/,
        loaders: ['style', 'css', 'sass', 'import-glob']
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    }),
  ]
};

