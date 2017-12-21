const chalk = require('chalk')
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');
const webpackDevServerConfig = require('../webpackDevServer.config');

const port = process.env.PORT || 8080;
const host = process.env.IP || 'localhost';
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

//
// Production we just want to compile to the build file and pass on starting the dev server
//
if (process.env.NODE_ENV === 'production') {
    Webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.log(chalk.bold.red('Fatal error was encountered during the build'));
            console.log(chalk.red(err));
        } else if (stats.hasErrors()) {
            console.log(chalk.bold.red('Errors were encountered during the build'));
            stats.compilation.errors.forEach(error => {
                console.log(chalk.bold.red(error.message));
            })
        } else if (stats.hasWarnings()) {
            console.log(chalk.bold.yellow('Warnings were encountered during the build'));
            stats.compilation.warnings.forEach(warning => {
                console.log(chalk.bold(chalk.yellow(warning.message)));
            })
        } else {
            console.log(chalk.bold.green(
                '\nWebpack has finished bundling the source files without errors\n'
            ));
        }
        
    });
//
// Development configuration. We compile as usual but include a webpack development server
//
} else if (process.env.NODE_ENV === 'development') {
    const server = new WebpackDevServer(Webpack(webpackConfig), webpackDevServerConfig);
    server.listen(port, host, () => {
        console.log(chalk.bold.green(
            'Server has been started at ' + chalk.underline(`${protocol}://${process.env.PUBLIC || host}:${port}`)
        )); 
    }) 
//
// Testing configuration
//
} else if (process.env.NODE_ENV === 'test') {
    // TODO Tests for DOM
//
// Fatal error. We should never get here
//
} else {
    console.log(chalk.bold.red('Fatal error: Compilation has failed'));
    process.exit(1);
}
