import yaml from 'js-yaml';
import ini from 'ini';

export default (fileContent, fileFormat) => {
  switch (fileFormat) {
    case '.json':
      return JSON.parse(fileContent);
    case '.ini':
      return ini.parse(fileContent);
    default:
      return yaml.safeLoad(fileContent);
  }
};
