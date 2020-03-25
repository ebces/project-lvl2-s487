const objectToString = (object, spaces = '') => {
  const twoSpaces = `${spaces}    `;
  const values = Object.entries(object);
  return values.reduce((acc, elem) => {
    const [key, value] = elem;
    if (typeof value !== 'object') {
      return `${acc}${twoSpaces}${key}: ${value}\n`;
    }
    return `${acc}${twoSpaces}${key}: {\n${objectToString(value, twoSpaces)}${twoSpaces}}\n`;
  }, '');
};


const render = (data, spaces = '') => {
  const twoSpace = `${spaces}  `;
  const fourSpaces = `${spaces}    `;
  const result = data.reduce((acc, elem) => {
    if (elem.children) {
      return `${acc}${twoSpace}  ${elem.name}: ${render(elem.children, fourSpaces)}\n`;
    }

    const oldStr = typeof elem.firstValue === 'object' ? `{\n${objectToString(elem.firstValue, fourSpaces)}${fourSpaces}}` : elem.firstValue;
    const newStr = typeof elem.secondValue === 'object' ? `{\n${objectToString(elem.secondValue, fourSpaces)}${fourSpaces}}` : elem.secondValue;

    if (elem.status === 'added') {
      return `${acc}${twoSpace}+ ${elem.name}: ${newStr}\n`;
    }
    if (elem.status === 'deleted') {
      return `${acc}${twoSpace}- ${elem.name}: ${oldStr}\n`;
    }
    if (elem.status === 'changed') {
      return `${acc}${twoSpace}- ${elem.name}: ${oldStr}\n${twoSpace}+ ${elem.name}: ${newStr}\n`;
    }

    return `${acc}${twoSpace}  ${elem.name}: ${oldStr}\n`;
  }, '');
  return `{\n${result}${spaces}}`;
};


export default render;
