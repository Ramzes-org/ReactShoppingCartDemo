const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { basename } = require('path')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpackCommon = require("./webpack.common");

module.exports = merge.smart(webpackCommon, {
  mode: "development",
  output: {
    publicPath: "/", // deploy on server with /app/ folder name
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../docs")
  },
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    overlay: true,
    contentBase: path.join(__dirname, "docs"),
    host: "localhost",
    port: 3002,
    publicPath: "/"
  },
  devtool: "cheap-eval-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "../src/favicon.ico"),
      inject: htmlPlugin => 
        basename(htmlPlugin.options.filename) === 'index.html'      
    })
  ]
});
