import _ from 'lodash';


const makeAST = (firstFile, secondFile) => {
  const keysFirstObject = Object.keys(firstFile);
  const keysSecondObject = Object.keys(secondFile);
  const keysOfTwoObjects = keysFirstObject.concat(keysSecondObject);
  const uniqueKeysOfTwoObjects = _.uniq(keysOfTwoObjects);

  const tree = uniqueKeysOfTwoObjects.map((key) => {
    if (_.isEqual(firstFile[key], secondFile[key])) {
      return {
        name: key,
        status: 'unchanged',
        firstValue: firstFile[key],
        secondValue: secondFile[key],
      };
    }

    if (_.has(firstFile, key) && !_.has(secondFile, key)) {
      return {
        name: key,
        status: 'deleted',
        firstValue: firstFile[key],
      };
    }

    if (!_.has(firstFile, key) && _.has(secondFile, key)) {
      return {
        name: key,
        status: 'added',
        secondValue: secondFile[key],
      };
    }

    if (typeof firstFile[key] === 'object' && typeof secondFile[key] === 'object') {
      return {
        name: key,
        children: makeAST(firstFile[key], secondFile[key]),
      };
    }

    return {
      name: key,
      status: 'changed',
      firstValue: firstFile[key],
      secondValue: secondFile[key],
    };
  });
  return tree;
};

export default makeAST;
