'use strict'

const chalk = require('chalk');

console.log(chalk.bold(chalk.cyan('\nWelcome to TryAngle!\n')))
console.log(chalk.bold(chalk.yellow("----------------------------------------\n")))

let envType = process.argv[2];
if (!envType || (envType !== 'production' && envType !== 'development')) {
    console.log(chalk.bold(chalk.red(
        'Err: Environment specification is either "development" or "production"\n'
    )));
    throw new Error();
}

console.log(chalk.bold(chalk.cyan(`Loading the ${process.argv[2]} environment...\n`)))

// Ensure the first thing done is setting the environment
process.env.BABEL_ENV = envType;
process.env.NODE_ENV = envType;

// If we don't handle an error, we want to quit right away to avoid unintended side-effects
process.on('unhandledRejection', err => {
    throw err;
});

// Load env variables
const fs = require('fs');
const path = require('path');
const paths = require('../config/paths')

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    throw new Error('NODE_ENV is required');
}
const envFiles = [
    `${paths.dotenv}.${NODE_ENV}`,
    paths.dotenv
]

envFiles.forEach(envFile => {
    if(fs.existsSync(envFile)) {
        require('dotenv').config({
            path: envFile
        });
    }
});

console.log(chalk.bold(chalk.green(`Successfully loaded ${process.env.NODE_ENV} environment!\n`)))

// if (process.env.NODE_ENV === 'development') {
    // const Webpack = require('webpack');
    // const WebpackDevServer = require('webpack-dev-server');
    // const webpackConfig = require('../webpack.config.js');
    
    // const compiler = Webpack(webpackConfig);
    // const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    //     stats: {
    //         colors: true
    //     } 
    // });
    // const server = new WebpackDevServer(compiler, devServerOptions)
    
    // server.listen(process.env.PORT, process.env.HOST, () => {
    //     console.log(chalk.bold(chalk.cyan(`Starting development server on ${process.env.IP}:${process.env.PORT}\n`)));
    // })
// }


