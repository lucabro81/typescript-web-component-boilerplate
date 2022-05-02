const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/main.ts',
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
	],
	watchOptions: {
		ignored: ['scripts/**/*.[js|template]', 'node_modules/**']
	},
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
		chunkFilename: "[id].bundle.js",
		publicPath: "/dist"
	},

	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: false,
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