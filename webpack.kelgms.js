/* eslint-disable no-undef */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Common = require('./webpack.common');
const { getFavIcon } = require('./src/utils/WebpackUtils');
const { PROJECT: { KELGMS }, MODE: { PRODUCTION }, PORTALS: { ADMIN } } = require('./src/configs/project');

module.exports = merge(Common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './public/index.html',
      title: 'KEL GMS',
      favicon: path.resolve(getFavIcon(KELGMS)),
      meta: {
        author: 'KEL GMS',
        KELGMS: 'KEL GMS Portal'
      }
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify({ PROJECT: KELGMS, MODE: PRODUCTION, PORTAL: ADMIN })
    })
  ]
});
