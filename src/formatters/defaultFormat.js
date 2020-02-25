import _ from 'lodash';


const objectToString = (object, spaces) => {
  const values = Object.entries(object);
  return values.reduce((acc, elem) => {
    const [key, value] = elem;
    if (typeof value !== 'object') {
      return `${acc}${spaces}${key}: ${value}\n`;
    }
    return `${acc} ${objectToString(value)}\n`;
  }, '');
};

const defaultFormat = (firstElem, secondElem, spaces = '') => {
  const newSpaces = `${spaces}    `;
  const keysFirstObject = Object.keys(firstElem);
  const keysSecondObject = Object.keys(secondElem);

  const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));
  const result = keysOfObjects.reduce((acc, elem) => {
    const newName = `  ${elem}`;
    const plusName = `+ ${elem}`;
    const minusName = `- ${elem}`;

    if (_.has(firstElem, elem) && _.has(secondElem, elem)) {
      if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] === 'object') {
        return `${acc}${newSpaces}${newName}: ${defaultFormat(firstElem[elem], secondElem[elem], newSpaces)}\n`;
      }
      if (typeof firstElem[elem] !== 'object' && typeof secondElem[elem] === 'object') {
        return `${acc}${newSpaces}${minusName}: ${firstElem[elem]}\n${newSpaces}${plusName}: {\n${newSpaces}${objectToString(secondElem[elem], newSpaces)}${newSpaces}}\n`;
      }
      if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] !== 'object') {
        return `${acc}${newSpaces}${minusName}: {\n${newSpaces}${objectToString(firstElem[elem], newSpaces)}${newSpaces}}\n${newSpaces}${plusName}: ${secondElem[elem]}\n`;
      }
      return _.isEqual(firstElem[elem], secondElem[elem])
        ? `${acc}${newSpaces}${newName}: ${firstElem[elem]}\n`
        : `${acc}${newSpaces}${minusName}: ${firstElem[elem]}\n${newSpaces}${plusName}: ${secondElem[elem]}\n`;
    }
    if (!_.has(firstElem, elem) && _.has(secondElem, elem)) {
      return typeof secondElem[elem] !== 'object' ? `${acc}${newSpaces}${plusName}: ${secondElem[elem]}\n` : `${acc}${newSpaces}${plusName}: {\n${newSpaces}${objectToString(secondElem[elem], newSpaces)}${newSpaces}}\n`;
    }
    if (_.has(firstElem, elem) && !_.has(secondElem, elem)) {
      return typeof firstElem[elem] !== 'object' ? `${acc}${newSpaces}${minusName}: ${firstElem[elem]}\n` : `${acc}${newSpaces}${minusName}: {\n${newSpaces}${objectToString(firstElem[elem], newSpaces)}${newSpaces}}\n`;
    }
    return acc;
  }, '');
  return `{\n${result}${spaces}}`;
};

export default defaultFormat;
