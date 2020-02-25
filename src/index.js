import fs from 'fs';
import extName from './parsers';
import defaultFormat from './formatters/defaultFormat';
import plainFormat from './formatters/plainFormat';
import jsonFormat from './formatters/jsonFormat';


const gendiff = (firstConfig, secondConfig, fileFormat = 'default') => {
  const parser = extName(firstConfig);
  const firstFile = parser(fs.readFileSync(firstConfig, 'utf-8'));
  const secondFile = parser(fs.readFileSync(secondConfig, 'utf-8'));

  if (fileFormat === 'plain' || fileFormat.format === 'plain') {
    console.log(plainFormat(firstFile, secondFile));
    return plainFormat(firstFile, secondFile);
  }
  if (fileFormat === 'json' || fileFormat.format === 'json') {
    console.log(jsonFormat(firstFile, secondFile));
    return jsonFormat(firstFile, secondFile);
  }
  console.log(defaultFormat(firstFile, secondFile));
  return defaultFormat(firstFile, secondFile);
};


export default gendiff;
