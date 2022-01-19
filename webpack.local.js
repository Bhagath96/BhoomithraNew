/* eslint-disable no-undef */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Common = require('./webpack.common');
const { getFavIcon } = require('./src/utils/WebpackUtils');
const { PROJECT: { BHOOMITRA: SELECTED_PROJECT }, MODE: { LOCAL }, PORTALS: { ADMIN } } = require('./src/configs/project');

module.exports = merge(Common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9900,
    watchContentBase: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './public/index.html',
      title: 'Bhoomitra [Local]',
      favicon: path.resolve(getFavIcon(SELECTED_PROJECT)),
      meta: {
        author: 'Trois Infotech',
        Bhoomitra: 'Bhoomitra Web Site'
      }
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify({ PROJECT: SELECTED_PROJECT, MODE: LOCAL, PORTAL: ADMIN })
    })
  ]
});
