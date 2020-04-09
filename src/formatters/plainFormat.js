const fileStatusStrings = {
  deleted: (path) => `Property "${path}" was removed`,
  added: (path, secondValue) => (typeof secondValue === 'object' ? `Property "${path}" was added with value: [complex value]`
    : `Property "${path}" was added with value: "${secondValue}"`),
  changed: (path, firstValue, secondValue) => {
    if (typeof firstValue === 'object') {
      return `Property "${path}" was updated. From [complex value] to "${secondValue}"`;
    }
    if (typeof secondValue === 'object') {
      return `Property "${path}" was updated. From "${firstValue}" to [complex value]`;
    }
    return `Property "${path}" was updated. From "${firstValue}" to "${secondValue}"`;
  },
};

const chooseString = (status) => fileStatusStrings[status];

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
            return chooseString(node.status)(newPath);
          case 'added':
            return chooseString(node.status)(newPath, node.secondValue);
          case 'changed':
            return chooseString(node.status)(newPath, node.firstValue, node.secondValue);
          default:
            throw new Error(`Invalid dataType: ${node.status}`);
        }
      });
    return result.join('\n');
  };
  return iter(data, []);
};


export default render;
