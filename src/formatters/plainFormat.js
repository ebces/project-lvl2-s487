const render = (data) => {
  const iter = (items, path) => {
    const result = items.reduce((acc, node) => {
      const partsOfPath = [...path, node.name];
      const newPath = partsOfPath.join('.');
      switch (node.status) {
        case 'hasChildren':
          return [...acc, `${iter(node.children, partsOfPath)}`];
        case 'deleted':
          return [...acc, `Property "${newPath}" was removed\n`];
        case 'added':
          return typeof node.secondValue === 'object' ? [...acc, `Property "${newPath}" was added with value: [complex value]\n`]
            : [...acc, `Property "${newPath}" was added with value: "${node.secondValue}"\n`];
        case 'changed':
          if (typeof node.firstValue === 'object') {
            return [...acc, `Property "${newPath}" was updated. From [complex value] to "${node.secondValue}"\n`];
          }
          if (typeof node.secondValue === 'object') {
            return [...acc, `Property "${newPath}" was updated. From "${node.firstValue}" to [complex value]\n`];
          }
          return [...acc, `Property "${newPath}" was updated. From "${node.firstValue}" to "${node.secondValue}"\n`];
        default:
          return acc;
      }
    }, []);
    return result.join('');
  };

  return iter(data, []);
};

export default render;
