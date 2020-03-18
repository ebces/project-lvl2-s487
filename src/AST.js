import _ from 'lodash';


const makeAST = (firstFile, secondFile) => {
  const keysFirstObject = Object.keys(firstFile);
  const keysSecondObject = Object.keys(secondFile);

  const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));

  const tree = keysOfObjects.reduce((acc, elem) => {
    if (typeof firstFile[elem] === 'object' && typeof secondFile[elem] === 'object') {
      return [...acc, {
        name: elem,
        oldType: typeof firstFile[elem],
        newType: typeof secondFile[elem],
        oldValue: firstFile[elem],
        newValue: secondFile[elem],
        children: makeAST(firstFile[elem], secondFile[elem]),
      }];
    }

    return [...acc, {
      name: elem,
      oldType: typeof firstFile[elem],
      newType: typeof secondFile[elem],
      oldValue: firstFile[elem],
      newValue: secondFile[elem],
    }];
  }, []);
  return tree;
};

export default makeAST;
