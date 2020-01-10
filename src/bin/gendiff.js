#!/usr/bin/env node

const program = require('commander');

program.description('Compares two configuration files and shows a difference.');
program.version('0.0.1');
program.option('-f --format [type]', 'Output format').arguments('qwe');
program.parse(process.argv);
