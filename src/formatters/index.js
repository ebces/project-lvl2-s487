import renderTree from './treeFormat';
import renderPlain from './plainFormat';
import renderJson from './jsonFormat';


const chooseFormatter = (format) => {
  switch (format) {
    case 'plain':
      return renderPlain;
    case 'json':
      return renderJson;
    default:
      return renderTree;
  }
};

export default chooseFormatter;
