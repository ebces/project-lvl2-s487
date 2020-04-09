const objectToString = (object, spaces = '') => {
  const twoSpaces = `${spaces}    `;
  const values = Object.entries(object);
  const partsOfString = values.map((node) => {
    const [key, value] = node;
    if (typeof value !== 'object') {
      return `${twoSpaces}${key}: ${value}`;
    }
    return `${twoSpaces}${key}: {\n${objectToString(value, twoSpaces)}${twoSpaces}}`;
  }, []);
  return partsOfString.join('\n');
};


const render = (data, spaces = '') => {
  const twoSpace = `${spaces}  `;
  const fourSpaces = `${spaces}    `;
  const result = data.map((node) => {
    const oldString = typeof node.firstValue === 'object' ? `{\n${objectToString(node.firstValue, fourSpaces)}\n${fourSpaces}}` : node.firstValue;
    const newString = typeof node.secondValue === 'object' ? `{\n${objectToString(node.secondValue, fourSpaces)}\n${fourSpaces}}` : node.secondValue;

    switch (node.status) {
      case 'hasChildren':
        return `${twoSpace}  ${node.name}: ${render(node.children, fourSpaces)}`;
      case 'added':
        return `${twoSpace}+ ${node.name}: ${newString}`;
      case 'deleted':
        return `${twoSpace}- ${node.name}: ${oldString}`;
      case 'changed':
        return `${twoSpace}- ${node.name}: ${oldString}\n${twoSpace}+ ${node.name}: ${newString}`;
      case 'unchanged':
        return `${twoSpace}  ${node.name}: ${oldString}`;
      default:
        throw new Error(`Invalid dataType: ${node.status}`);
    }
  });
  return `{\n${result.join('\n')}\n${spaces}}`;
};

export default render;
