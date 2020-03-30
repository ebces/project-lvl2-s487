import fs from 'fs';
import path from 'path';
import parseData from './parsers';
import makeAST from './AST';
import chooseFormatter from './formatters/index';


const gendiff = (pathToFirstFile, pathToSecondFile, outputFormat) => {
  const fileFormat = path.extname(pathToFirstFile).slice(1);
  const firstFileContent = fs.readFileSync(pathToFirstFile, 'utf-8');
  const secondFileContent = fs.readFileSync(pathToSecondFile, 'utf-8');

  const firstParsedData = parseData(firstFileContent, fileFormat);
  const secondParsedData = parseData(secondFileContent, fileFormat);

  const AST = makeAST(firstParsedData, secondParsedData);

  const formatter = chooseFormatter(outputFormat);

  console.log(formatter(AST));
  return formatter(AST);
};


export default gendiff;
