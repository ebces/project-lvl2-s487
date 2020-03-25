const render = (data) => {
  const iter = (items, path) => items.reduce((acc, elem) => {
    const partsOfPath = [...path, elem.name];
    const newPath = partsOfPath.join('.');

    if (elem.children) {
      return `${acc}${iter(elem.children, partsOfPath)}`;
    }
    if (elem.status === 'deleted') {
      return `${acc}Property "${newPath}" was removed\n`;
    }
    if (elem.status === 'added') {
      return typeof elem.secondValue === 'object' ? `${acc}Property "${newPath}" was added with value: [complex value]\n`
        : `${acc}Property "${newPath}" was added with value: "${elem.secondValue}"\n`;
    }
    if (elem.status === 'changed') {
      if (typeof elem.firstValue === 'object') {
        return `${acc}Property "${newPath}" was updated. From [complex value] to "${elem.secondValue}"\n`;
      }
      if (typeof elem.secondValue === 'object') {
        return `${acc}Property "${newPath}" was updated. From "${elem.firstValue}" to [complex value]\n`;
      }
      return `${acc}Property "${newPath}" was updated. From "${elem.firstValue}" to "${elem.secondValue}"\n`;
    }
    return acc;
  }, '');


  return iter(data, []);
};

export default render;
