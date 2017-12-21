const chalk = require('chalk')
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');
const webpackDevServerConfig = require('../webpackDevServer.config')

const port = process.env.PORT || 8080;
const host = process.env.IP || 'localhost';
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

// Set up webpack compiler
const compiler = Webpack(webpackConfig, (err, stats) => {
    if (err) {
        console.log(chalk.bold.red('Fatal error was encountered during the build'));
        console.log(chalk.red('\t' + err));
    } else if (stats.hasErrors()) {
        console.log(chalk.bold.red('Errors were encountered during the build'));
        stats.compilation.errors.forEach(error => {
            console.log(chalk.bold.red('\t' + error.message));
        })
    } else if (stats.hasWarnings()) {
        console.log(chalk.bold.yellow('Warnings were encountered during the build'));
        stats.compilation.errors.forEach(error => {
            console.log(chalk.bold(chalk.yellow('\t' + error.message)));
        })
    } else {
        console.log(chalk.bold.green(
            '\nWebpack has finished bundling the source files without errors\n'
        ));
    }
});

const server = new WebpackDevServer(compiler, webpackDevServerConfig);
server.listen(port, host, () => {
    console.log(chalk.bold(`Webpack dev server has been started at ${protocol}://${process.env.PUBLIC || host}:${port}\n`))
})