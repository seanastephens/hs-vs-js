var webpack = require( 'webpack' );

module.exports = {
	entry: './index.js',
	output: {
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [ 'babel-loader' ]
			},
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.ProvidePlugin( {
			'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
		})
	],
	resolve: {
		modulesDirectories: [ '', 'lib', 'node_modules' ],
		extensions: [ '', '.js' ]
	}
};
