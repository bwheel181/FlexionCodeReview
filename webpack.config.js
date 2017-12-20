const paths = require('./config/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const PUBLIC = process.env.PUBLIC || '/'
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = {
    entry: {
        app: './src/index.tsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        filename: 'app.bundle.js',
        path: paths.build,
        publicPath: ASSET_PATH
    },
    devtool: 'cheap-module-source-map',
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
    // Dev server doesn't yet support proxies
    devServer: {
        public: PUBLIC,
        contentBase: paths.build,
        hot: true,
        publicPath: ASSET_PATH,
        clientLogLevel: 'none',
        compress: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "PUT, GET, OPTIONS, HEAD"
        },
        https: PROTOCOL === 'https',
        quiet: true,
        open: true,
        useLocalIp: true,
    },
    stats: {
        all: undefined,
        assets: true,
        cached: true,
        colors: true,
        entrypoints: true,
        children: false,
    }
}