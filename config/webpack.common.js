const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV == 'production';

module.exports = {
	resolve: {
		modules: [path.resolve(__dirname, '../src'), 'node_modules']
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf|json)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							fallback: 'file-loader',
							limit: 8192,
							context: path.resolve(__dirname, "../src"),
              name: "[path][name].[ext]"
						}
					}
				]
			},
			{
				test: /\.(sc|sa|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html',
      favicon: "./src/favicon.ico"
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : '[name].[hash].css',
			chunkFileName: devMode ? '[id].css' : '[id].[hash].css'
		})
	]
}