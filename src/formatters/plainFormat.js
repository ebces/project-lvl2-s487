const render = (data) => {
  const iter = (items, path) => items.reduce((acc, node) => {
    const partsOfPath = [...path, node.name];
    const newPath = partsOfPath.join('.');

    if (node.children) {
      return `${acc}${iter(node.children, partsOfPath)}`;
    }
    if (node.status === 'deleted') {
      return `${acc}Property "${newPath}" was removed\n`;
    }
    if (node.status === 'added') {
      return typeof node.secondValue === 'object' ? `${acc}Property "${newPath}" was added with value: [complex value]\n`
        : `${acc}Property "${newPath}" was added with value: "${node.secondValue}"\n`;
    }
    if (node.status === 'changed') {
      if (typeof node.firstValue === 'object') {
        return `${acc}Property "${newPath}" was updated. From [complex value] to "${node.secondValue}"\n`;
      }
      if (typeof node.secondValue === 'object') {
        return `${acc}Property "${newPath}" was updated. From "${node.firstValue}" to [complex value]\n`;
      }
      return `${acc}Property "${newPath}" was updated. From "${node.firstValue}" to "${node.secondValue}"\n`;
    }
    return acc;
  }, '');


  return iter(data, []);
};

export default render;
