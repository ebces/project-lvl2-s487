import _ from 'lodash';

const render = (data) => {
  const res = data.reduce((acc, elem) => {
if(elem.newType === 'object' && elem.oldType === 'object') {
  return `${acc}  ${treeFormat()}`
}
//console.log(elem.oldType)
    if (elem.newType === 'undefined') {
      return `${acc}  - ${elem.name}:${elem.oldValue}\n`;
    }
    if (elem.oldType === 'undefined') {
      return `${acc}  + ${elem.name}:${elem.newValue}\n`;
    }
    if (elem.oldValue === elem.newValue) {
      return `${acc}    ${elem.name}:${elem.newValue}\n`;
    }
    return `${acc}  - ${elem.name}:${elem.oldValue}\n  + ${elem.name}:${elem.newValue}\n`;
  }, '');
  return `{\n${res}}`;
};

const treeFormat = (firstFile, secondFile) => {
  const keysFirstObject = Object.keys(firstFile);
  const keysSecondObject = Object.keys(secondFile);

  const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));

  const tree = keysOfObjects.reduce((acc, elem) => [...acc, {
    name: elem,
    oldType: typeof firstFile[elem],
    newType: typeof secondFile[elem],
    oldValue: firstFile[elem],
    newValue: secondFile[elem],
  }], []);
  return render(tree);
};


// const treeFormat = (firstElem, secondElem, spaces = '') => {
//   const newSpaces = `${spaces}    `;
//   const keysFirstObject = Object.keys(firstElem);
//   const keysSecondObject = Object.keys(secondElem);

//   const keysOfObjects = _.uniq(keysFirstObject.concat(keysSecondObject));
//   const result = keysOfObjects.reduce((acc, elem) => {
//     const newName = `  ${elem}`;
//     const plusName = `+ ${elem}`;
//     const minusName = `- ${elem}`;

//     if (_.has(firstElem, elem) && _.has(secondElem, elem)) {
//       if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] === 'object') {
//         return `${acc}${newSpaces}${newName}: ${treeFormat(firstElem[elem], secondElem[elem], newSpaces)}\n`;
//       }
//       if (typeof firstElem[elem] !== 'object' && typeof secondElem[elem] === 'object') {
//         return `${acc}${newSpaces}${minusName}: ${firstElem[elem]}\n${newSpaces}${plusName}: ${treeFormat({}, secondElem[elem], newSpaces)}\n`;
//       }
//       if (typeof firstElem[elem] === 'object' && typeof secondElem[elem] !== 'object') {
//         return `${acc}${newSpaces}${minusName}: ${treeFormat(firstElem[elem], {}, newSpaces)}\n${newSpaces}${plusName}: ${secondElem[elem]}\n`;
//       }
//       return _.isEqual(firstElem[elem], secondElem[elem])
//         ? `${acc}${newSpaces}${newName}: ${firstElem[elem]}\n`
//         : `${acc}${newSpaces}${minusName}: ${firstElem[elem]}\n${newSpaces}${plusName}: ${secondElem[elem]}\n`;
//     }
//     if (!_.has(firstElem, elem) && _.has(secondElem, elem)) {
//       return typeof secondElem[elem] !== 'object' ? `${acc}${newSpaces}${plusName}: ${secondElem[elem]}\n` : `${acc}${newSpaces}${plusName}: ${treeFormat({}, secondElem[elem], newSpaces)}\n`;
//     }
//     if (_.has(firstElem, elem) && !_.has(secondElem, elem)) {
//       return typeof firstElem[elem] !== 'object' ? `${acc}${newSpaces}${minusName}: ${firstElem[elem]}\n` : `${acc}${newSpaces}${minusName}: ${treeFormat(firstElem[elem], {}, newSpaces)}\n`;
//     }
//     return acc;
//   }, '');
//   return `{\n${result}${spaces}}`;
// };

export default treeFormat;
