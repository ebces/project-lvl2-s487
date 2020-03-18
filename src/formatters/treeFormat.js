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
    if (elem.newType === 'object' && elem.oldType === 'object') {
      return `${acc}${twoSpace}  ${elem.name}: ${render(elem.children, fourSpaces)}\n`;
    }
    const oldStr = elem.oldType === 'object' ? `{\n${objectToString(elem.oldValue, fourSpaces)}${fourSpaces}}` : elem.oldValue;
    const newstr = elem.newType === 'object' ? `{\n${objectToString(elem.newValue, fourSpaces)}${fourSpaces}}` : elem.newValue;
    if (elem.newType === 'undefined') {
      return `${acc}${twoSpace}- ${elem.name}: ${oldStr}\n`;
    }
    if (elem.oldType === 'undefined') {
      return `${acc}${twoSpace}+ ${elem.name}: ${newstr}\n`;
    }
    if (elem.oldValue === elem.newValue) {
      return `${acc}${twoSpace}  ${elem.name}: ${newstr}\n`;
    }
    return `${acc}${twoSpace}- ${elem.name}: ${oldStr}\n${twoSpace}+ ${elem.name}: ${newstr}\n`;
  }, '');
  return `{\n${result}${spaces}}`;
};


export default render;
