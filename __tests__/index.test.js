import gendiff from '../src';

const fs = require('fs');

const getFile = (path) => fs.readFileSync(`${__dirname}${path}`, 'utf-8');

test('gendiff', () => {
  expect(gendiff(__dirname.concat('/__fixtures__/before.json'),
    __dirname.concat('/__fixtures__/after.json'))).toEqual(getFile('/__fixtures__/result'));
  expect(gendiff(__dirname.concat('/__fixtures__/before.yml'),
    __dirname.concat('/__fixtures__/after.yml'))).toEqual(getFile('/__fixtures__/result'));
  expect(gendiff(__dirname.concat('/__fixtures__/before.ini'),
    __dirname.concat('/__fixtures__/after.ini'))).toEqual(getFile('/__fixtures__/result'));

  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.json'),
    __dirname.concat('/__fixtures__/treeAfter.json'))).toEqual(getFile('/__fixtures__/resultTree'));
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.yml'),
    __dirname.concat('/__fixtures__/treeAfter.yml'))).toEqual(getFile('/__fixtures__/resultTree'));
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.ini'),
    __dirname.concat('/__fixtures__/treeAfter.ini'))).toEqual(getFile('/__fixtures__/resultTree'));

  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.json'),
    __dirname.concat('/__fixtures__/treeAfter.json'), 'plain')).toEqual(getFile('/__fixtures__/resultString'));
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.yml'),
    __dirname.concat('/__fixtures__/treeAfter.yml'), 'plain')).toEqual(getFile('/__fixtures__/resultString'));
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.ini'),
    __dirname.concat('/__fixtures__/treeAfter.ini'), 'plain')).toEqual(getFile('/__fixtures__/resultString'));

  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.json'),
    __dirname.concat('/__fixtures__/treeAfter.json'), 'json')).toEqual(getFile('/__fixtures__/resultJSON'));
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.yml'),
    __dirname.concat('/__fixtures__/treeAfter.yml'), 'json')).toEqual(getFile('/__fixtures__/resultYML'));
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.ini'),
    __dirname.concat('/__fixtures__/treeAfter.ini'), 'json')).toEqual(getFile('/__fixtures__/resultJSON'));
});
