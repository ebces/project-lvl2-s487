import { isObject } from 'lodash';

const dataToString = (data) => (isObject(data) ? '[complex value]' : `"${data}"`);

const render = (data) => {
  const iter = (items, path) => {
    const result = items.filter((node) => node.status !== 'unchanged')
      .map((node) => {
        const partsOfPath = [...path, node.name];
        const newPath = partsOfPath.join('.');
        switch (node.status) {
          case 'hasChildren':
            return `${iter(node.children, partsOfPath)}`;
          case 'deleted':
            return `Property "${newPath}" was removed`;
          case 'added':
            return `Property "${newPath}" was added with value: ${dataToString(node.secondValue)}`;
          case 'changed':
            return `Property "${newPath}" was updated. From ${dataToString(node.firstValue)} to ${dataToString(node.secondValue)}`;
          default:
            throw new Error(`Invalid status: ${node.status}`);
        }
      });
    return result.join('\n');
  };
  return iter(data, []);
};


export default render;
