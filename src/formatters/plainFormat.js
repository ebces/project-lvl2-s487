const chooseStringByStatus = (status, path, firstValue, secondValue) => {

  switch (status) {
    case 'deleted':
      return `Property "${path}" was removed`;
    case 'added':
      return typeof secondValue === 'object' ? `Property "${path}" was added with value: [complex value]`
        : `Property "${path}" was added with value: "${secondValue}"`;
    case 'changed':
      if (typeof firstValue === 'object') {
        return `Property "${path}" was updated. From [complex value] to "${secondValue}"`;
      }
      if (typeof secondValue === 'object') {
        return `Property "${path}" was updated. From "${firstValue}" to [complex value]`;
      }
      return `Property "${path}" was updated. From "${firstValue}" to "${secondValue}"`;
    default:
      throw new Error(`Invalid dataType: ${status}`);
  }
};

const render = (data) => {
  const iter = (items, path) => {
    const result = items.map((node) => {
      const partsOfPath = [...path, node.name];
      const newPath = partsOfPath.join('.');
      switch (node.status) {
        case 'hasChildren':
          return `${iter(node.children, partsOfPath)}`;
        case 'deleted':
          return chooseStringByStatus(node.status, newPath);
        case 'added':
          return chooseStringByStatus(node.status, newPath, '', node.secondValue);
        case 'changed':
          return chooseStringByStatus(node.status, newPath, node.firstValue, node.secondValue);
        case 'unchanged':
          return '';
        default:
          throw new Error(`Invalid dataType: ${node.status}`);
      }
    });
    return result.join('\n');
  };

  return iter(data, []);
};

export default render;
