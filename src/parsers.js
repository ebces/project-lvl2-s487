const yaml = require('js-yaml');
const path = require('path');
const ini = require('ini');


export default (pathToFile) => {
  switch (path.extname(pathToFile)) {
    case '.json':
      return JSON.parse;
    case '.ini':
      return ini.parse;
    default:
      return yaml.safeLoad;
  }
};
