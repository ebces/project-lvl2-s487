const objectToString = (object, nestingLevel = 1) => {
  const third = ' '.repeat(nestingLevel * 4 - 2);

  const twoSpaces = ' '.repeat(nestingLevel * 4 + 2);
  const values = Object.entries(object);
  const partsOfString = values.map((node) => {
    const [key, value] = node;
    if (typeof value !== 'object') {
      return `${twoSpaces}${key}: ${value}`;
    }
    return `${twoSpaces}${key}: {\n${objectToString(value, twoSpaces)}${twoSpaces}}`;
  }, []);
  return `{\n${partsOfString.join('\n')}\n${third}}`;
};

const buildString = (node, level) => (typeof node === 'object' ? objectToString(node, level) : node);

const render = (data, nestingLevel = 1) => {
  const indent = ' ';
  const indentStep = nestingLevel * 4;
  const twoSpace = indent.repeat(indentStep - 2);
  const fourSpaces = indent.repeat(indentStep);
  const third = ' '.repeat(indentStep - 4);
  const result = data.map((node) => {
    switch (node.status) {
      case 'hasChildren':
        return `${twoSpace}  ${node.name}: ${render(node.children, nestingLevel + 1)}`;
      case 'added':
        return `${twoSpace}+ ${node.name}: ${buildString(node.secondValue, nestingLevel)}`;
      case 'deleted':
        return `${twoSpace}- ${node.name}: ${buildString(node.firstValue, nestingLevel)}`;
      case 'changed':
        return `${twoSpace}- ${node.name}: ${buildString(node.firstValue, nestingLevel)}\n${twoSpace}+ ${node.name}: ${buildString(node.secondValue, nestingLevel)}`;
      case 'unchanged':
        return `${twoSpace}  ${node.name}: ${buildString(node.firstValue, nestingLevel)}`;
      default:
        throw new Error(`Invalid status: ${node.status}`);
    }
  });
  return `{\n${result.join('\n')}\n${third}}`;
};

export default render;

// const objectToString = (object, spaces = '') => {
//   const twoSpaces = `${spaces}    `;
//   const values = Object.entries(object);
//   const partsOfString = values.map((node) => {
//     const [key, value] = node;
//     if (typeof value !== 'object') {
//       return `${twoSpaces}${key}: ${value}`;
//     }
//     return `${twoSpaces}${key}: {\n${objectToString(value, twoSpaces)}${twoSpaces}}`;
//   }, []);
//   return partsOfString.join('\n');
// };

// const buildString = (node, spaces) => (typeof node === 'object' ? `{\n${objectToString(node, spaces)}\n${spaces}}` : node);

// const render = (data, spaces = '') => {
//   const twoSpace = `${spaces}  `;
//   const fourSpaces = `${spaces}    `;
//   const result = data.map((node) => {
//     switch (node.status) {
//       case 'hasChildren':
//         return `${twoSpace}  ${node.name}: ${render(node.children, fourSpaces)}`;
//       case 'added':
//         return `${twoSpace}+ ${node.name}: ${buildString(node.secondValue, fourSpaces)}`;
//       case 'deleted':
//         return `${twoSpace}- ${node.name}: ${buildString(node.firstValue, fourSpaces)}`;
//       case 'changed':
//         return `${twoSpace}- ${node.name}: ${buildString(node.firstValue, fourSpaces)}\n${twoSpace}+ ${node.name}: ${buildString(node.secondValue, fourSpaces)}`;
//       case 'unchanged':
//         return `${twoSpace}  ${node.name}: ${buildString(node.firstValue, fourSpaces)}`;
//       default:
//         throw new Error(`Invalid status: ${node.status}`);
//     }
//   });
//   return `{\n${result.join('\n')}\n${spaces}}`;
// };

// export default render;
