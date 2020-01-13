import _ from 'lodash';

const fs = require('fs');


const gendiff = (firstConfig, secondConfig) => {
  const first = JSON.parse(fs.readFileSync(firstConfig, (err, data) => data));
  const second = JSON.parse(fs.readFileSync(secondConfig, (err, data) => data));

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
