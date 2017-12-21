const paths = require('./config/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const assetPath = process.env.ASSET_PATH || '/';

module.exports = {
    entry: {
        app: './src/index.tsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: 'app.bundle.js',
        path: paths.build,
        publicPath: assetPath
    },
    devtool: 'cheap-module-source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']  
    },
    plugins: [
        new HtmlWebpackPlugin({ inject: true, template: './public/index.html' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
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
    }
}