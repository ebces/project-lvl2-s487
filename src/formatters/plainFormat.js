import _ from 'lodash';


const render = (data) => {
  const iter = (items, path) => items.reduce((acc, elem) => {
    const partsOfPath = [...path, elem.name];
    const newPath = partsOfPath.join('.');

    if (elem.newType === 'object' && elem.oldType === 'object') {
      return `${acc}${iter(elem.children, partsOfPath)}`;
    }
    if (elem.newType === 'undefined') {
      return `${acc}Property "${newPath}" was removed\n`;
    }
    if (elem.oldType === 'undefined') {
      return elem.newType === 'object' ? `${acc}Property "${newPath}" was added with value: [complex value]\n`
        : `${acc}Property "${newPath}" was added with value: "${elem.newValue}"\n`;
    }
    if (!_.isEqual(elem.oldValue, elem.newValue)) {
      if (elem.oldType === 'object') {
        return `${acc}Property "${newPath}" was updated. From [complex value] to "${elem.newValue}"\n`;
      }
      if (elem.newType === 'object') {
        return `${acc}Property "${newPath}" was updated. From "${elem.oldValue}" to [complex value]\n`;
      }
      return `${acc}Property "${newPath}" was updated. From "${elem.oldValue}" to "${elem.newValue}"\n`;
    }
    return acc;
  }, '');


  return iter(data, []);
};

export default render;
