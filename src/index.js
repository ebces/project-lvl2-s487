import fs from 'fs';
import path from 'path';
import parser from './parsers';
import { render } from './formatters/defaultFormat';
import plainFormat from './formatters/plainFormat';
import jsonFormat from './formatters/jsonFormat';
import treeFormat from './formatters/defaultFormat';


const gendiff = (firstConfig, secondConfig, outputFormat = 'default') => {
  const fileFormat = path.extname(firstConfig);

  const firstFileContent = fs.readFileSync(firstConfig, 'utf-8');
  const secondFileContent = fs.readFileSync(secondConfig, 'utf-8');

  const firstParsedFile = parser(firstFileContent, fileFormat);
  const secondParsedFile = parser(secondFileContent, fileFormat);

  if (outputFormat === 'plain' || outputFormat.format === 'plain') {
    console.log(plainFormat(firstParsedFile, secondParsedFile));
    return plainFormat(firstParsedFile, secondParsedFile);
  }
  if (outputFormat === 'json' || outputFormat.format === 'json') {
    console.log(jsonFormat(firstParsedFile, secondParsedFile));
    return jsonFormat(firstParsedFile, secondParsedFile);
  }
  console.log(render(treeFormat(firstParsedFile, secondParsedFile)));
  return treeFormat(firstParsedFile, secondParsedFile);
};


export default gendiff;
