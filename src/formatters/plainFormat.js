import _ from 'lodash';


const plainFormat = (firstElem, secondElem) => {
  const iter = (fFile, sFile, accPath) => {
    const keysFirstObject = Object.keys(fFile);
    const keysSecondObject = Object.keys(sFile);
    const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));

    return keysOfObjects.reduce((acc, elem) => {
      const newPath = typeof fFile[elem] === 'object' && typeof sFile[elem] === 'object' ? [...accPath, `${elem}.`] : accPath;

      if (_.has(fFile, elem) && !_.has(sFile, elem)) {
        return [...acc, `Property "${newPath.join(' ')}${elem}" was removed`];
      }
      if (!_.has(fFile, elem) && _.has(sFile, elem)) {
        return typeof sFile[elem] === 'object'
          ? [...acc, `Property "${newPath.join(' ')}${elem}" was added with value: [complex value]`]
          : [...acc, `Property "${newPath.join(' ')}${elem}" was added with value: ${sFile[elem]}`];
      }
      if (_.has(fFile, elem) && _.has(sFile, elem)) {
        if (!_.isEqual(fFile[elem], sFile[elem])) {
          console.log(newPath);
          return typeof sFile[elem] === 'object'
            ? [...acc, ...iter(fFile[elem], sFile[elem], newPath)] // [...acc, `Property "${newPath.join(' ')}${elem}" was update. From "${fFile[elem]}" to [complex value]`]
            : [...acc, `Property "${newPath.join(' ')}${elem}" was update. From "${fFile[elem]}" to "${sFile[elem]}"`];
        }
      }

      return typeof fFile[elem] === 'object' && typeof sFile[elem] === 'object' ? [...acc, ...iter(fFile[elem], sFile[elem], newPath)] : acc;
    }, []);
  };
  console.log(iter(firstElem, secondElem, []));
  return iter(firstElem, secondElem, []);
};

export default plainFormat;
