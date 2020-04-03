import _ from 'lodash';


const makeAST = (firstData, secondData) => {
  const keysFirstData = _.keys(firstData);
  const keysSecondData = _.keys(secondData);
  const uniqueKeysOfTwoObjects = _.union(keysFirstData, keysSecondData);

  const tree = uniqueKeysOfTwoObjects.map((key) => {
    if (_.isEqual(firstData[key], secondData[key])) {
      return {
        name: key,
        status: 'unchanged',
        firstValue: firstData[key],
        secondValue: secondData[key],
      };
    }

    if (!_.has(secondData, key)) {
      return {
        name: key,
        status: 'deleted',
        firstValue: firstData[key],
      };
    }

    if (!_.has(firstData, key)) {
      return {
        name: key,
        status: 'added',
        secondValue: secondData[key],
      };
    }

    if (typeof firstData[key] === 'object' && typeof secondData[key] === 'object') {
      return {
        name: key,
        status: 'hasChildren',
        children: makeAST(firstData[key], secondData[key]),
      };
    }

    return {
      name: key,
      status: 'changed',
      firstValue: firstData[key],
      secondValue: secondData[key],
    };
  });
  return tree;
};

export default makeAST;
