import _ from 'lodash';
import { ymlParser, jsonParser } from './parsers';


const path = require('path');
const fs = require('fs');

const typeOfFile = (pathToFile) => {
  switch (path.extname(pathToFile)) {
    case '.json':
      return jsonParser;
    default:
      return ymlParser;
  }
};

const gendiff = (firstConfig, secondConfig) => {
  const parser = typeOfFile(firstConfig);
  const first = parser(fs.readFileSync(firstConfig, 'utf-8'));
  const second = parser(fs.readFileSync(secondConfig, 'utf-8'));

  const keysFirstObject = Object.keys(first);
  const keysSecondObject = Object.keys(second);

  const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));

  const result = keysOfObjects.reduce((acc, elem) => {
    const newName = ` ${elem}`;
    const plusName = `+${elem}`;
    const minusName = `-${elem}`;

    if (_.has(first, elem) && _.has(second, elem)) {
      return first[elem] === second[elem]
        ? { ...acc, [newName]: first[elem] }
        : { ...acc, [minusName]: first[elem], [plusName]: second[elem] };
    }
    if (!_.has(first, elem) && _.has(second, elem)) {
      return { ...acc, [plusName]: second[elem] };
    }
    if (_.has(first, elem) && !_.has(second, elem)) {
      return { ...acc, [minusName]: first[elem] };
    }
    return acc;
  }, {});
  console.log(result);
  return result;
};


export default gendiff;
