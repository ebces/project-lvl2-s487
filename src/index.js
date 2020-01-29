import _ from 'lodash';
import extName from './parsers';


const fs = require('fs');


const gendiff = (firstConfig, secondConfig) => {
  const parser = extName(firstConfig);
  const firstFile = parser(fs.readFileSync(firstConfig, 'utf-8'));
  const secondFile = parser(fs.readFileSync(secondConfig, 'utf-8'));

  const iter = (firstElem, secondElem) => {
    const keysFirstObject = Object.keys(firstElem);
    const keysSecondObject = Object.keys(secondElem);

    const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));
    return keysOfObjects.reduce((acc, elem) => {
      const newName = ` ${elem}`;
      const plusName = `+${elem}`;
      const minusName = `-${elem}`;

      if (_.has(firstElem, elem) && _.has(secondElem, elem)) {
        if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] === 'object') {
          return { ...acc, [newName]: iter(firstElem[elem], secondElem[elem]) };
        }

        return _.isEqual(firstElem[elem], secondElem[elem])
          ? { ...acc, [newName]: firstElem[elem] }
          : { ...acc, [minusName]: firstElem[elem], [plusName]: secondElem[elem] };
      }
      if (!_.has(firstElem, elem) && _.has(secondElem, elem)) {
        return { ...acc, [plusName]: secondElem[elem] };
      }
      if (_.has(firstElem, elem) && !_.has(secondElem, elem)) {
        return { ...acc, [minusName]: firstElem[elem] };
      }
      return acc;
    }, {});
  };

  console.log(iter(firstFile, secondFile));
  return iter(firstFile, secondFile);
};


export default gendiff;
