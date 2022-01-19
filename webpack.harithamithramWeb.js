/* eslint-disable no-undef */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Common = require('./webpack.common');
const { getFavIcon } = require('./src/utils/WebpackUtils');
const { PROJECT: { HARITHAMITHRAM }, MODE: { PRODUCTION } } = require('./src/configs/project');

module.exports = merge(Common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/web'),
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './public/index.html',
      title: 'Harithamithram',
      favicon: path.resolve(getFavIcon(HARITHAMITHRAM)),
      meta: {
        author: 'Harithamithram',
        Harithamithram: 'Harithamithram Web Site'
      }
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify({ PROJECT: HARITHAMITHRAM, MODE: PRODUCTION })
    })
  ]
});
