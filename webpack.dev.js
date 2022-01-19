/* eslint-disable no-undef */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Common = require('./webpack.common');
const { getFavIcon } = require('./src/utils/WebpackUtils');
const { PROJECT: { BHOOMITRA: SELECTED_PROJECT }, MODE: { DEVELOPMENT }, PORTALS: { ADMIN } } = require('./src/configs/project');

module.exports = merge(Common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './public/index.html',
      title: 'Bhoomitra [Dev]',
      favicon: path.resolve(getFavIcon(SELECTED_PROJECT)),
      meta: {
        author: 'Bhoomitra',
        Bhoomitra: 'Bhoomitra Web Site'
      }
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify({ PROJECT: SELECTED_PROJECT, MODE: DEVELOPMENT, PORTAL: ADMIN })
    })
  ]
});
