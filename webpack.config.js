const paths = require('./config/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.tsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: 'app.bundle.js',
        path: paths.build
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']  
    },
    plugins: [
        new HtmlWebpackPlugin({ inject: true, template: './public/index.html' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'tslint-loader',
                enforce: 'pre'
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                enforce: 'pre'
            },
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            }
        ]
    },
    // process.env.IP and process.env.PORT is required for things like Cloud9
    devServer: {
        host: process.env.IP || '0.0.0.0',
        port: process.env.PORT || 8080,
        public: 'flexion-code-challenge-bjw181.c9users.io',
        contentBase: paths.build
    }
}