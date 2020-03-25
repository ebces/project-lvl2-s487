import fs from 'fs';
import path from 'path';
import parseData from './parsers';
import makeAST from './AST';
import renderTree from './formatters/treeFormat';
import renderPlain from './formatters/plainFormat';
import renderJson from './formatters/jsonFormat';

const gendiff = (pathToFirstFile, pathToSecondFile, outputFormat) => {
  const fileFormat = path.extname(pathToFirstFile);

  const firstFileContent = fs.readFileSync(pathToFirstFile, 'utf-8');
  const secondFileContent = fs.readFileSync(pathToSecondFile, 'utf-8');

  const firstParsedFile = parseData(firstFileContent, fileFormat);
  const secondParsedFile = parseData(secondFileContent, fileFormat);

  const AST = makeAST(firstParsedFile, secondParsedFile);

  if (outputFormat === 'plain') {
    console.log(renderPlain(AST));
    return renderPlain(AST);
  }
  if (outputFormat === 'json') {
    console.log(renderJson(AST));
    return renderJson(AST);
  }
  console.log(renderTree(AST));
  return renderTree(AST);
};


export default gendiff;
