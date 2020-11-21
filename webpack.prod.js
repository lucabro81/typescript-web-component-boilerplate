const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/main.ts',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				loader: 'css-loader',
				exclude: /node_modules/,
				options: {
					sourceMap: false
				}
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [new TsconfigPathsPlugin({configFile: "./tsconfig.json"})]
	},

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		chunkFilename: "[id].js"
	},

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					},
					output: {
						comments: false,
					},
				},
				extractComments: false,
			})
		]
	},
};