'use strict'

const chalk = require('chalk');
console.log(chalk.bold.yellow('\n***Welcome to TryAngle***\n'));

let envType = process.argv[2];
if (!envType || (envType !== 'production' && envType !== 'development' && envType !== 'test')) {
    console.log(chalk.bold.red(
        'Error: Environment specification is either "development", "test", or "production"\n'
    ));
    throw new Error();
}

console.log(chalk.bold.magenta(`Loading the ${process.argv[2]} environment...\n`));

// Ensure the first thing done is setting the environment
process.env.BABEL_ENV = envType;
process.env.NODE_ENV = envType;

// If we don't handle an error, we want to quit right away to avoid unintended side-effects
process.on('unhandledRejection', err => {
    throw err;
});

// Load env variables. This allows for a specific configuration to be creeated based on different environments
const fs = require('fs');
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

console.log(chalk.bold.green(`Successfully loaded ${process.env.NODE_ENV} environment!\n`));

if (process.env.NODE_ENV === 'development') {
    require('./compile_dev')
}

// Development environment configuration. Here we:
// 1) Configure the  Webpack Dev Server. Its worth noting that if you are working in a remote dev
//    environment you will need to set the PUBLIC variable in a .env file to point to your public
//    facing IP in order for the webserver to work. 
//    
// if (process.env.NODE_ENV === 'development') {
//     const Webpack = require('webpack');
//     const WebpackDevServer = require('webpack-dev-server');
//     const webpackConfig = require('../webpack.config.js');
    
//     const compiler = Webpack(webpackConfig, (err, stats) => {
//         console.log(chalk.bold.green('\nWebpack has finished bundling the source files'));
//         if (err) {
//             console.log(chalk.bold.red('Fatal error was encountered during the build'));
//             console.log(chalk.red('\t' + err));
//         } else if (stats.hasErrors()) {
//             console.log(chalk.bold.red('Errors were encountered during the build'));
//             stats.compilation.errors.forEach(error => {
//                 console.log(chalk.bold.red('\t' + error.message));
//             })
//         } else if (stats.hasWarnings()) {
//             console.log(chalk.bold.yellow('Warnings were encountered during the build'));
//             stats.compilation.errors.forEach(error => {
//                 console.log(chalk.bold(chalk.yellow('\t' + error.message)));
//             })
//         } else {
//             console.log(chalk.bgCyan(stats.toJson().hash))
            
//         }
//     });
//     const devServerOptions = Object.assign({}, webpackConfig.devServer, {
//         stats: {
//             colors: true
//         } 
//     });
//     const server = new WebpackDevServer(compiler, devServerOptions)
    
//     // process.env.IP and process.env.PORT is required for development tools like Cloud9
//     const port = process.env.PORT || 8080;
//     const host = process.env.IP || process.env.HOST || '0.0.0.0';
    
//     server.listen(port, host, () => {
//         console.log(chalk.bold.magenta('Starting development server...'));
//         console.log(chalk.bold.green(`Successfully loaded the development server!`));
//         console.log(chalk.bold.magenta("Dev server located at: ") + chalk.underline.bold(`http://${process.env.PUBLIC || host}:${port}\n`));})
// }
