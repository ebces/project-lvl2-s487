import fs from 'fs';
import path from 'path';
import gendiff from '../src';


const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
const getFileContent = (fileName) => fs.readFileSync(getFixturePath(fileName), 'utf-8');


test('gendiff', () => {
  const resultTree = getFileContent('resultTree');
  const resultString = getFileContent('resultString');
  const resultJSON = getFileContent('resultJSON');
  const resultYmlJSON = getFileContent('resultYML');

  expect(gendiff(getFixturePath('treeBefore.json'), getFixturePath('treeAfter.json'))).toEqual(resultTree);
  expect(gendiff(getFixturePath('treeBefore.yml'), getFixturePath('treeAfter.yml'))).toEqual(resultTree);
  expect(gendiff(getFixturePath('treeBefore.ini'), getFixturePath('treeAfter.ini'))).toEqual(resultTree);

  expect(gendiff(getFixturePath('treeBefore.json'), getFixturePath('treeAfter.json'), 'plain')).toEqual(resultString);
  expect(gendiff(getFixturePath('treeBefore.yml'), getFixturePath('treeAfter.yml'), 'plain')).toEqual(resultString);
  expect(gendiff(getFixturePath('treeBefore.ini'), getFixturePath('treeAfter.ini'), 'plain')).toEqual(resultString);

  expect(gendiff(getFixturePath('treeBefore.json'), getFixturePath('treeAfter.json'), 'json')).toEqual(resultJSON);
  expect(gendiff(getFixturePath('treeBefore.yml'), getFixturePath('treeAfter.yml'), 'json')).toEqual(resultYmlJSON);
  expect(gendiff(getFixturePath('treeBefore.ini'), getFixturePath('treeAfter.ini'), 'json')).toEqual(resultJSON);
});
