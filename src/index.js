import fs from 'fs';
import path from 'path';
import parser from './parsers';
import makeAST from './AST';
import renderTree from './formatters/treeFormat';
import renderPlain from './formatters/plainFormat';
import renderJson from './formatters/jsonFormat';

const gendiff = (firstConfig, secondConfig, outputFormat = 'default') => {
  const fileFormat = path.extname(firstConfig);

  const firstFileContent = fs.readFileSync(firstConfig, 'utf-8');
  const secondFileContent = fs.readFileSync(secondConfig, 'utf-8');

  const firstParsedFile = parser(firstFileContent, fileFormat);
  const secondParsedFile = parser(secondFileContent, fileFormat);

  const AST = makeAST(firstParsedFile, secondParsedFile);

  if (outputFormat === 'plain' || outputFormat.format === 'plain') {
    console.log(renderPlain(AST));
    return renderPlain(AST);
  }
  if (outputFormat === 'json' || outputFormat.format === 'json') {
    console.log(renderJson(AST));
    return renderJson(AST);
  }
  console.log(renderTree(AST));
  return renderTree(AST);
};


export default gendiff;
