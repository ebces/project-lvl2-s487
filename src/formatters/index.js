import renderTree from './treeFormat';
import renderPlain from './plainFormat';


const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return renderPlain;
    case 'json':
      return JSON.stringify;
    default:
      return renderTree;
  }
};

export default chooseFormatter;
