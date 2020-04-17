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
      return makeNode(key, 'added', null, secondData[key]);
    }

    if (_.isEqual(firstData[key], secondData[key])) {
      return makeNode(key, 'unchanged', firstData[key], secondData[key]);
    }

    if (_.isObject(firstData[key]) && _.isObject(secondData[key])) {
      return makeNode(key, 'hasChildren', null, null, makeAST(firstData[key], secondData[key]));
    }

    return makeNode(key, 'changed', firstData[key], secondData[key]);
  });
  return tree;
};

export default makeAST;
