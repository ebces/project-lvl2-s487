import _ from 'lodash';


const plainFormat = (firstElem, secondElem) => {
  const iter = (fFile, sFile, accPath) => {
    const keysFirstObject = Object.keys(fFile);
    // console.log(`${keysFirstObject} ключи первого объекта`);
    const keysSecondObject = Object.keys(sFile);
    // console.log(`${keysSecondObject} ключи второго объекта`);
    const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));
    // console.log(`${keysOfObjects} ключи объектов`);

    return keysOfObjects.reduce((acc, elem) => {
      // console.log(elem);
      // console.log(typeof fFile[elem] === 'object')
      const newPath = typeof fFile[elem] === 'object' && typeof sFile[elem] === 'object' ? [...accPath, elem] : accPath;
      if (typeof fFile[elem] !== 'object' && typeof sFile[elem] !== 'object') {
        // console.log('!!!!')
        return [...acc, `${newPath.join('.')}${elem}`];
      }

      return [...acc, ...iter(fFile[elem], sFile[elem], newPath)];
    }, []);
  };
  console.log(iter(firstElem, secondElem, []))
  return iter(firstElem, secondElem, []);


  // return keysOfObjects.reduce((acc, elem) => {
  //   if (_.has(firstElem, elem) && _.has(secondElem, elem)) {
  //     return !_.isEqual(firstElem[elem], secondElem[elem])
  //       ? [...acc, `Property '${elem}' was updated. From ${firstElem[elem]} to ${secondElem[elem]}`] : acc;
  //   }
  //   if (!_.has(firstElem, elem) && _.has(secondElem, elem) && typeof secondElem[elem] === 'object') {
  //     return [...acc, `Property '${elem}' was added with value: [complex value]`];
  //   }
  //   if (!_.has(firstElem, elem) && _.has(secondElem, elem)) {
  //     return [...acc, `Property '${elem}' was added with value: ${secondElem[elem]}`];
  //   }
  //   if (_.has(firstElem, elem) && !_.has(secondElem, elem)) {
  //     return [...acc, `Property '${elem}' was removed`];
  //   }
  //   return acc;
  // }, []);
};

export default plainFormat;
