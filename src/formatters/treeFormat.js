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

const buildString = (node, spaces) => (typeof node === 'object' ? `{\n${objectToString(node, spaces)}\n${spaces}}` : node);

const render = (data, spaces = '') => {
  const twoSpace = `${spaces}  `;
  const fourSpaces = `${spaces}    `;
  const result = data.map((node) => {
    switch (node.status) {
      case 'hasChildren':
        return `${twoSpace}  ${node.name}: ${render(node.children, fourSpaces)}`;
      case 'added':
        return `${twoSpace}+ ${node.name}: ${buildString(node.secondValue, fourSpaces)}`;
      case 'deleted':
        return `${twoSpace}- ${node.name}: ${buildString(node.firstValue, fourSpaces)}`;
      case 'changed':
        return `${twoSpace}- ${node.name}: ${buildString(node.firstValue, fourSpaces)}\n${twoSpace}+ ${node.name}: ${buildString(node.secondValue, fourSpaces)}`;
      case 'unchanged':
        return `${twoSpace}  ${node.name}: ${buildString(node.firstValue, fourSpaces)}`;
      default:
        throw new Error(`Invalid status: ${node.status}`);
    }
  });
  return `{\n${result.join('\n')}\n${spaces}}`;
};

export default render;
