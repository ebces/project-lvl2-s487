import _ from 'lodash';


const objectToString = (object) => {
  const values = Object.entries(object);
  return values.reduce((acc, elem) => {
    const [key, value] = elem;
    if (typeof value !== 'object') {
      return `${acc} ${key}: ${value}\n`;
    }
    return `${acc} ${objectToString(value)}\n`;
  }, '');
};

const defaultFormat = (firstElem, secondElem) => {
  const keysFirstObject = Object.keys(firstElem);
  const keysSecondObject = Object.keys(secondElem);

  const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));
  const result = keysOfObjects.reduce((acc, elem) => {
    const newName = `  ${elem}`;
    const plusName = `+ ${elem}`;
    const minusName = `- ${elem}`;

    if (_.has(firstElem, elem) && _.has(secondElem, elem)) {
      if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] === 'object') {
        return `${acc} ${newName}: ${defaultFormat(firstElem[elem], secondElem[elem])}\n`;
      }
      if (typeof firstElem[elem] !== 'object' && typeof secondElem[elem] === 'object') {
        return `${acc} ${minusName}: ${firstElem[elem]}\n ${plusName}: {\n${objectToString(secondElem[elem])}}\n`;
      }
      if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] !== 'object') {
        return `${acc} ${minusName}: {\n${objectToString(firstElem[elem])}}\n ${plusName}: ${secondElem[elem]}\n`;
      }
      return _.isEqual(firstElem[elem], secondElem[elem])
        ? `${acc} ${newName}: ${firstElem[elem]}\n`
        : `${acc} ${minusName}: ${firstElem[elem]}\n ${plusName}: ${secondElem[elem]}\n`;
    }
    if (!_.has(firstElem, elem) && _.has(secondElem, elem)) {
      return typeof secondElem[elem] !== 'object' ? `${acc} ${plusName}: ${secondElem[elem]}\n` : `${acc} ${plusName}: {\n${objectToString(secondElem[elem])}}\n`;
    }
    if (_.has(firstElem, elem) && !_.has(secondElem, elem)) {
      return typeof firstElem[elem] !== 'object' ? `${acc} ${minusName}: ${firstElem[elem]}\n` : `${acc} ${minusName}: {\n${objectToString(firstElem[elem])}}\n`;
    }
    return acc;
  }, '');
  return `{\n${result}}`;
};

export default defaultFormat;
