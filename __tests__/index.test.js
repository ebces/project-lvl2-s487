import fs from 'fs';
import path from 'path';
import gendiff from '../src';


const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const getFileContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');


test.each([
  [getFixturePath('treeBefore.json'), getFixturePath('treeAfter.json'), '', getFileContent('resultTree')],
  [getFixturePath('treeBefore.yml'), getFixturePath('treeAfter.yml'), '', getFileContent('resultTree')],
  [getFixturePath('treeBefore.ini'), getFixturePath('treeAfter.ini'), '', getFileContent('resultTree')],
  [getFixturePath('treeBefore.json'), getFixturePath('treeAfter.json'), 'plain', getFileContent('resultString')],
  [getFixturePath('treeBefore.yml'), getFixturePath('treeAfter.yml'), 'plain', getFileContent('resultString')],
  [getFixturePath('treeBefore.ini'), getFixturePath('treeAfter.ini'), 'plain', getFileContent('resultString')],
  [getFixturePath('treeBefore.json'), getFixturePath('treeAfter.json'), 'json', getFileContent('resultJSON')],
  [getFixturePath('treeBefore.yml'), getFixturePath('treeAfter.yml'), 'json', getFileContent('resultYML')],
  [getFixturePath('treeBefore.ini'), getFixturePath('treeAfter.ini'), 'json', getFileContent('resultINI')],
])('gendiff', (firstPath, secondPath, format, expected) => {
  expect(gendiff(firstPath, secondPath, format)).toEqual(expected);
});
