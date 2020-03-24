import fs from 'fs';
import path from 'path';
import gendiff from '../src';


const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const getFileContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');

test.each([
  ['treeBefore.json', 'treeAfter.json', '', 'resultTree'],
  ['treeBefore.yml', 'treeAfter.yml', '', 'resultTree'],
  ['treeBefore.ini', 'treeAfter.ini', '', 'resultTree'],
  ['treeBefore.json', 'treeAfter.json', 'plain', 'resultString'],
  ['treeBefore.yml', 'treeAfter.yml', 'plain', 'resultString'],
  ['treeBefore.ini', 'treeAfter.ini', 'plain', 'resultString'],
  ['treeBefore.json', 'treeAfter.json', 'json', 'resultJSON'],
  ['treeBefore.yml', 'treeAfter.yml', 'json', 'resultYML'],
  ['treeBefore.ini', 'treeAfter.ini', 'json', 'resultINI'],
])('gendiff', (firstPath, secondPath, format, expected) => {
  const pathToFirstFile = getFixturePath(firstPath);
  const pathToSecondFile = getFixturePath(secondPath);
  const result = getFileContent(expected);
  expect(gendiff(pathToFirstFile, pathToSecondFile, format)).toEqual(result);
});
