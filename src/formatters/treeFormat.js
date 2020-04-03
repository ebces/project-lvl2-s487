const objectToString = (object, spaces = '') => {
  const twoSpaces = `${spaces}    `;
  const values = Object.entries(object);
  const partOfString = values.reduce((acc, node) => {
    const [key, value] = node;
    if (typeof value !== 'object') {
      return [...acc, `${twoSpaces}${key}: ${value}\n`];
    }
    return [...acc, `${twoSpaces}${key}: {\n${objectToString(value, twoSpaces)}${twoSpaces}}\n`];
  }, []);
  return partOfString.join('');
};


const render = (data, spaces = '') => {
  const twoSpace = `${spaces}  `;
  const fourSpaces = `${spaces}    `;
  const result = data.reduce((acc, node) => {
    const oldString = typeof node.firstValue === 'object' ? `{\n${objectToString(node.firstValue, fourSpaces)}${fourSpaces}}` : node.firstValue;
    const newString = typeof node.secondValue === 'object' ? `{\n${objectToString(node.secondValue, fourSpaces)}${fourSpaces}}` : node.secondValue;

    switch (node.status) {
      case 'hasChildren':
        return [...acc, `${twoSpace}  ${node.name}: ${render(node.children, fourSpaces)}\n`];
      case 'added':
        return [...acc, `${twoSpace}+ ${node.name}: ${newString}\n`];
      case 'deleted':
        return [...acc, `${twoSpace}- ${node.name}: ${oldString}\n`];
      case 'changed':
        return [...acc, `${twoSpace}- ${node.name}: ${oldString}\n${twoSpace}+ ${node.name}: ${newString}\n`];
      default:
        return [...acc, `${twoSpace}  ${node.name}: ${oldString}\n`];
    }
  }, []);
  return `{\n${result.join('')}${spaces}}`;
};

export default render;
