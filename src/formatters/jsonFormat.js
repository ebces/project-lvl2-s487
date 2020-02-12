import _ from 'lodash';


const jsonFormat = (firstElem, secondElem) => {
  const keysFirstObject = Object.keys(firstElem);
  const keysSecondObject = Object.keys(secondElem);

  const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));
  const result = keysOfObjects.reduce((acc, elem) => {
    const newName = ` ${elem}`;
    const plusName = `+${elem}`;
    const minusName = `-${elem}`;

    if (_.has(firstElem, elem) && _.has(secondElem, elem)) {
      if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] === 'object') {
        return { ...acc, [newName]: jsonFormat(firstElem[elem], secondElem[elem]) };
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

  return JSON.stringify(result);
};

export default jsonFormat;