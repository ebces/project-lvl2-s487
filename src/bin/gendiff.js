#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program.description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .version('0.0.1')
  .option('-f, --format [type]', 'Output format', 'treeFormat')
  .action((path1, path2) => console.log(gendiff(path1, path2, program.format)))
  .parse(process.argv);
