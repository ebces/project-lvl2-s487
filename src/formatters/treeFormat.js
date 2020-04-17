import { isObject } from 'lodash';


const objectToString = (object, nestingLevel = 1) => {
  const indentStep = nestingLevel * 4;
  const indentBeforeName = ' '.repeat(indentStep + 4);
  const indentAfterName = ' '.repeat(indentStep);
  const values = Object.entries(object);
  const partsOfString = values.map((node) => {
    const [key, value] = node;
    if (!isObject(value)) {
      return `${indentBeforeName}${key}: ${value}`;
    }
    return `${indentBeforeName}${key}: ${objectToString(value, nestingLevel + 1)}`;
  }, []);
  return `{\n${partsOfString.join('\n')}\n${indentAfterName}}`;
};

const buildString = (node, level) => (isObject(node) ? objectToString(node, level) : node);

const render = (data, nestingLevel = 1) => {
  const indentStep = nestingLevel * 4;
  const indentBeforeName = ' '.repeat(indentStep - 2);
  const indentAfterName = ' '.repeat(indentStep - 4);

  const result = data.map((node) => {
    switch (node.status) {
      case 'hasChildren':
        return `${indentBeforeName}  ${node.name}: ${render(node.children, nestingLevel + 1)}`;
      case 'added':
        return `${indentBeforeName}+ ${node.name}: ${buildString(node.secondValue, nestingLevel)}`;
      case 'deleted':
        return `${indentBeforeName}- ${node.name}: ${buildString(node.firstValue, nestingLevel)}`;
      case 'changed':
        return `${indentBeforeName}- ${node.name}: ${buildString(node.firstValue, nestingLevel)}\n${indentBeforeName}+ ${node.name}: ${buildString(node.secondValue, nestingLevel)}`;
      case 'unchanged':
        return `${indentBeforeName}  ${node.name}: ${buildString(node.firstValue, nestingLevel)}`;
      default:
        throw new Error(`Invalid status: ${node.status}`);
    }
  });
  return `{\n${result.join('\n')}\n${indentAfterName}}`;
};

export default render;
