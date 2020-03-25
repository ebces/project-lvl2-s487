import _ from 'lodash';


const makeAST = (firstFile, secondFile) => {
  const keysFirstObject = Object.keys(firstFile);
  const keysSecondObject = Object.keys(secondFile);

  const uniqueKeysOfTwoObjects = _.uniq(keysFirstObject.concat(keysSecondObject));

  const tree = uniqueKeysOfTwoObjects.map((elem) => {
    if (_.has(firstFile, elem) && _.has(secondFile, elem)) {
      if (typeof firstFile[elem] === 'object' && typeof secondFile[elem] === 'object') {
        return {
          name: elem,
          children: makeAST(firstFile[elem], secondFile[elem]),
        };
      }
    }
    if (_.has(firstFile, elem) && !_.has(secondFile, elem)) {
      return {
        name: elem,
        status: 'deleted',
        firstValue: firstFile[elem],
      };
    }

    if (!_.has(firstFile, elem) && _.has(secondFile, elem)) {
      return {
        name: elem,
        status: 'added',
        secondValue: secondFile[elem],
      };
    }


    if (_.isEqual(firstFile[elem], secondFile[elem])) {
      return {
        name: elem,
        status: 'unchanged',
        firstValue: firstFile[elem],
        secondValue: secondFile[elem],
      };
    }

    return {
      name: elem,
      status: 'changed',
      firstValue: firstFile[elem],
      secondValue: secondFile[elem],
    };
  });
  return tree;
};

export default makeAST;
