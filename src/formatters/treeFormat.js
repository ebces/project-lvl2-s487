const objectToString = (object, spaces = '') => {
  const twoSpaces = `${spaces}    `;
  const values = Object.entries(object);
  return values.reduce((acc, node) => {
    const [key, value] = node;
    if (typeof value !== 'object') {
      return `${acc}${twoSpaces}${key}: ${value}\n`;
    }
    return `${acc}${twoSpaces}${key}: {\n${objectToString(value, twoSpaces)}${twoSpaces}}\n`;
  }, '');
};


const render = (data, spaces = '') => {
  const twoSpace = `${spaces}  `;
  const fourSpaces = `${spaces}    `;
  const result = data.reduce((acc, node) => {
    if (node.children) {
      return `${acc}${twoSpace}  ${node.name}: ${render(node.children, fourSpaces)}\n`;
    }

    const oldString = typeof node.firstValue === 'object' ? `{\n${objectToString(node.firstValue, fourSpaces)}${fourSpaces}}` : node.firstValue;
    const newString = typeof node.secondValue === 'object' ? `{\n${objectToString(node.secondValue, fourSpaces)}${fourSpaces}}` : node.secondValue;

    if (node.status === 'added') {
      return `${acc}${twoSpace}+ ${node.name}: ${newString}\n`;
    }
    if (node.status === 'deleted') {
      return `${acc}${twoSpace}- ${node.name}: ${oldString}\n`;
    }
    if (node.status === 'changed') {
      return `${acc}${twoSpace}- ${node.name}: ${oldString}\n${twoSpace}+ ${node.name}: ${newString}\n`;
    }

    return `${acc}${twoSpace}  ${node.name}: ${oldString}\n`;
  }, '');
  return `{\n${result}${spaces}}`;
};


export default render;
