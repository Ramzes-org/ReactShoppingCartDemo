const path = require('path');
const merge = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackCommon = require('./webpack.common');

module.exports = merge.smart(webpackCommon, {
	output: {
		filename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, '../build'),
		publicPath: ''
	},
	mode: 'production',
	optimization: {
		minimizer: [
			new TerserPlugin({
				sourceMap: true,
			}),
		],
	},
	plugins: [
		new OptimizeCssAssetsPlugin(),
		new CleanWebpackPlugin(),
	]
})