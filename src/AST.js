import _ from 'lodash';

const makeNode = (name, status, firstValue, secondValue, children) => ({
  name,
  status,
  firstValue,
  secondValue,
  children,
});

const makeAST = (firstData, secondData) => {
  const keysFirstData = _.keys(firstData);
  const keysSecondData = _.keys(secondData);
  const uniqueKeysOfTwoObjects = _.union(keysFirstData, keysSecondData);

  const tree = uniqueKeysOfTwoObjects.map((key) => {
    if (!_.has(secondData, key)) {
      return makeNode(key, 'deleted', firstData[key]);
    }

    if (!_.has(firstData, key)) {
      return makeNode(key, 'added', undefined, secondData[key]);
    }

    if (_.isEqual(firstData[key], secondData[key])) {
      return makeNode(key, 'unchanged', firstData[key], secondData[key]);
    }

    if (typeof firstData[key] === 'object' && typeof secondData[key] === 'object') {
      return makeNode(key, 'hasChildren', undefined, undefined, makeAST(firstData[key], secondData[key]));
    }

    return makeNode(key, 'changed', firstData[key], secondData[key]);
  });
  return tree;
};

export default makeAST;




// const makeAST = (firstData, secondData) => {
//   const keysFirstData = _.keys(firstData);
//   const keysSecondData = _.keys(secondData);
//   const uniqueKeysOfTwoObjects = _.union(keysFirstData, keysSecondData);

//   const tree = uniqueKeysOfTwoObjects.map((key) => {
//     if (!_.has(secondData, key)) {
//       return {
//         name: key,
//         status: 'deleted',
//         firstValue: firstData[key],
//       };
//     }

//     if (!_.has(firstData, key)) {
//       return {
//         name: key,
//         status: 'added',
//         secondValue: secondData[key],
//       };
//     }

//     if (_.isEqual(firstData[key], secondData[key])) {
//       return {
//         name: key,
//         status: 'unchanged',
//         firstValue: firstData[key],
//         secondValue: secondData[key],
//       };
//     }

//     if (typeof firstData[key] === 'object' && typeof secondData[key] === 'object') {
//       return {
//         name: key,
//         status: 'hasChildren',
//         children: makeAST(firstData[key], secondData[key]),
//       };
//     }

//     return {
//       name: key,
//       status: 'changed',
//       firstValue: firstData[key],
//       secondValue: secondData[key],
//     };
//   });
//   return tree;
// };

// export default makeAST;
