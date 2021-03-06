import yaml from 'js-yaml';
import ini from 'ini';

export default (data, dataType) => {
  switch (dataType) {
    case 'json':
      return JSON.parse(data);
    case 'ini':
      return ini.parse(data);
    case 'yml':
      return yaml.safeLoad(data);
    default:
      throw new Error(`Invalid dataType: ${dataType}`);
  }
};
