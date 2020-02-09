import _ from 'lodash';


const plainFormat = (firstElem, secondElem) => {
  const iter = (fFile, sFile, accPath) => {
    const keysFirstObject = Object.keys(fFile);
    const keysSecondObject = Object.keys(sFile);
    const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));

    return keysOfObjects.reduce((acc, elem) => {
      const newPath = typeof fFile[elem] === 'object' && typeof sFile[elem] === 'object' ? [...accPath, `${elem}.`] : accPath;

      // if (typeof fFile[elem] !== 'object' && typeof sFile[elem] !== 'object') {
      //   return [...acc, `${newPath.join('.')}${elem}`];
      // }
      if (_.has(fFile, elem) && !_.has(sFile, elem)) {
        return [...acc, `Property "${newPath.join(' ')}${elem}" was removed`];
      }
      if (!_.has(fFile, elem) && _.has(sFile, elem)) {
        return typeof sFile[elem] === 'object'
          ? [...acc, `Property "${newPath.join(' ')}${elem}" was added with value: [complex value]`]
          : [...acc, `Property "${newPath.join(' ')}${elem}" was added with value: ${sFile[elem]}`];
      }
      //

      if (_.has(fFile, elem) && _.has(sFile, elem)) {
        if (!_.isEqual(fFile[elem], sFile[elem])) {
          return [...acc, `Property "${newPath.join(' ')}${elem}" was updated. From ${fFile[elem]} to ${sFile[elem]}`];
        }
      }
      //


      return typeof fFile[elem] === 'object' && typeof sFile[elem] === 'object' ? [...acc, ...iter(fFile[elem], sFile[elem], newPath)] : acc;
    }, []);
  };
  console.log(iter(firstElem, secondElem, []));
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
