const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackCopy = require('./webpack.copy')
const webpackRoutes = require('./webpack.routes')

//Add the modules in the vendor
const VENDOR_LIBS = [
  'jquery',
  'underscore',
  'bootstrap',
  'chart.js',
  'pace-progress',
  'popper.js',
  'whatwg-fetch',
  'url-parse',
  'set-query-string',
  'jquery-validation',
  'axios',
  'marked',
  'sweetalert',
  'datatables',
  'dragdealer',
  '@turf/turf'
]

module.exports = {
  entry: { //add your entries
    login: './src/login/index.js', //login
    organization: './src/organization/index.js', //Dashboard
    project: './src/project/index.js',
    admin: './src/admin/index.js',
    variable: './src/variable/index.js',
    perfil: './src/perfil/index.js',
    grouplotes: './src/grouplotes/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js', //let's do high performance our page using chunkhash
    publicPath: '/'
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      use: ['style-loader', 'css-loader'],
      test: /\.css$/
    }, {
      test: /\.(png|jp(e*)g|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: 'images/[hash]-[name].[ext]'
          // name: '[hash]-[name].[ext]'
        }
      }]
    }, {
      test: require.resolve("pace-progress"),
      loader: "imports-loader?define=>false"
    }]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ //Para que los modulos no esten en el bundle.js solo en vendor.js
      names: ['vendor', 'manifest']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    // new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin(webpackCopy()),
    new HtmlWebpackPlugin(webpackRoutes.login),
    new HtmlWebpackPlugin(webpackRoutes.organization),
    new HtmlWebpackPlugin(webpackRoutes.project),
    new HtmlWebpackPlugin(webpackRoutes.admin),
    new HtmlWebpackPlugin(webpackRoutes.variable),
    new HtmlWebpackPlugin(webpackRoutes.perfil),
    new HtmlWebpackPlugin(webpackRoutes.grouplotes)

  ],
  devServer: {
    overlay: true
  }
};