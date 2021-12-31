const chalk = require('chalk');
// import chalk from 'chalk';
const log = console.log;

const startLog = (moduleName, functionName) => {
    log('\n' + chalk.bgGreen.bold(`${moduleName}:`) + ' ' + chalk.green.bold(`${functionName} `) + 'process commenced!');
};

const endLog = (moduleName, functionName) => {
    log(chalk.bgRed.bold(`${moduleName}:`) + ' ' + chalk.red.bold(`${functionName} `) + 'process completed!');
}

module.exports = {
    startLog,
    endLog
}