/* eslint-disable no-undef */
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const Common = require('./webpack.common');
const { getFavIcon } = require('./src/utils/WebpackUtils');
const { PROJECT: { NAGPUR_SMART_CITY }, MODE: { PRODUCTION }, PORTALS: { ADMIN } } = require('./src/configs/project');

module.exports = merge(Common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './public/index.html',
      title: 'नागपूर स्मार्ट सिटी',
      favicon: path.resolve(getFavIcon(NAGPUR_SMART_CITY)),
      meta: {
        author: 'Nagpur Smart City',
        NagpurSmartCity: 'Nagpur-Smart-City Web Site'
      }
    }),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify({ PROJECT: NAGPUR_SMART_CITY, MODE: PRODUCTION, PORTAL: ADMIN })
    })
  ]
});
