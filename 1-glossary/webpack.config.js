require("dotenv").config();
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const entry_DIR = path.join(__dirname, './client/src');
const output_DIR = path.join(__dirname, './client/dist');

/*
  What should go here?  Great question!

  Before you go to documentation, verify which version of webpack
  you are using.

  Use this config to copy production versions of your
  index.html and styles.css to dist folder upon build
*/

module.exports = {
  mode: 'development',

  entry: `${entry_DIR}/index.jsx`,

  output: {
    path: output_DIR,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: `${entry_DIR}/index.html`, to: output_DIR },
        { from: `${entry_DIR}/styles.css`, to: output_DIR }
      ]
    })
  ]

};
