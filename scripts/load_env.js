'use strict'

const chalk = require('chalk');
console.log(chalk.bold.yellow('\n***Welcome to TryAngle***\n'));

let envType = process.argv[2];
if (!envType || (envType !== 'production' && envType !== 'development' && envType !== 'test')) {
    console.log(chalk.bold.red(
        'Error: Environment specification is either "development", "test", or "production"\n'
    ));
    process.exit();
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

// Start compilation
require('./compile');

