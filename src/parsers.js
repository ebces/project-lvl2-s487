const yaml = require('js-yaml');


export const ymlParser = yaml.safeLoad;
export const jsonParser = JSON.parse;
