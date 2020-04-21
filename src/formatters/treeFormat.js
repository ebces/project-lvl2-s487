import { isObject } from 'lodash';


const objectToString = (object, depth = 1) => {
  const indentStep = depth * 4;
  const indentBeforeName = ' '.repeat(indentStep + 4);
  const indentAfterName = ' '.repeat(indentStep);
  const values = Object.entries(object);
  const partsOfString = values.map((node) => {
    const [key, value] = node;
    if (!isObject(value)) {
      return `${indentBeforeName}${key}: ${value}`;
    }
    return `${indentBeforeName}${key}: ${objectToString(value, depth + 1)}`;
  }, []);
  return `{\n${partsOfString.join('\n')}\n${indentAfterName}}`;
};

const buildString = (node, level) => (isObject(node) ? objectToString(node, level) : node);

const render = (data, depth = 1) => {
  const indentStep = depth * 4;
  const indentBeforeName = ' '.repeat(indentStep - 2);
  const indentAfterName = ' '.repeat(indentStep - 4);

  const result = data.map((node) => {
    switch (node.status) {
      case 'hasChildren':
        return `${indentBeforeName}  ${node.name}: ${render(node.children, depth + 1)}`;
      case 'added':
        return `${indentBeforeName}+ ${node.name}: ${buildString(node.secondValue, depth)}`;
      case 'deleted':
        return `${indentBeforeName}- ${node.name}: ${buildString(node.firstValue, depth)}`;
      case 'changed':
        return `${indentBeforeName}- ${node.name}: ${buildString(node.firstValue, depth)}\n${indentBeforeName}+ ${node.name}: ${buildString(node.secondValue, depth)}`;
      case 'unchanged':
        return `${indentBeforeName}  ${node.name}: ${buildString(node.firstValue, depth)}`;
      default:
        throw new Error(`Invalid status: ${node.status}`);
    }
  });
  return `{\n${result.join('\n')}\n${indentAfterName}}`;
};

export default render;
