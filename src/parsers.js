const yaml = require('js-yaml');
const path = require('path');


export default (pathToFile) => {
  switch (path.extname(pathToFile)) {
    case '.json':
      return JSON.parse;
    default:
      return yaml.safeLoad;
  }
};
