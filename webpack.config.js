'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var ENV = process.env.npm_lifecycle_event;
var isProd = ENV === 'build';

module.exports = function makeWebpackConfig () {

  var config = {};

  config.entry = {
    app: './src/js/app.js'
  };

  config.output = {
    path: __dirname + '/dist',
    filename:'[name].bundle.js',
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  if (!isProd) {
    config.devtool = 'eval-source-map';
  }

  config.module = {
    preLoaders: [],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {
      test: /\.html$/,
      loader: 'html'
    }]
  };

  config.plugins = [
    new HtmlWebpackPlugin({title: 'Norigin Test Task', template: 'src/html/app.html', inject: 'body'}),
    new ExtractTextPlugin('bundle.css')
  ];

  if (isProd) {
    config.plugins.push(
      new webpack.NoErrorsPlugin(),

      new webpack.optimize.DedupePlugin(),

      new webpack.optimize.UglifyJsPlugin(),

      new CopyWebpackPlugin([{
        from: __dirname + '/src/public'
      }])
    )
  }
  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal'
  };

  return config;
}();
