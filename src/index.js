import _ from 'lodash';
import extName from './parsers';


const fs = require('fs');


const gendiff = (firstConfig, secondConfig) => {
  const parser = extName(firstConfig);
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
      return _.isEqual(first[elem], second[elem]) // first[elem] === second[elem]
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
