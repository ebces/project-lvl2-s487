#!/usr/bin/env node

import gendiff from '..';

const program = require('commander');

program.description('Compares two configuration files and shows a difference.');
program.arguments('<firstConfig> <secondConfig>');
program.version('0.0.1');
program.option('-f, --format [type]', 'Output format');
program.action(gendiff);
program.parse(process.argv);
