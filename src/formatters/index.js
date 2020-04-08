import renderTree from './treeFormat';
import renderPlain from './plainFormat';


const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return renderPlain;
    case 'json':
      return JSON.stringify;
    case 'treeFormat':
      return renderTree;
    default:
      throw new Error(`Invalid format: ${format}`);
  }
};

export default chooseFormatter;
