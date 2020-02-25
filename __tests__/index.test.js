import fs from 'fs';
import gendiff from '../src';


const getFileContent = (path) => fs.readFileSync(`${__dirname}${path}`, 'utf-8');

const resultTree = getFileContent('/__fixtures__/resultTree');
const resultString = getFileContent('/__fixtures__/resultString');
const resultJSON = getFileContent('/__fixtures__/resultJSON');
const resultYmlJSON = getFileContent('/__fixtures__/resultYML');

const gendiffTestJSON = gendiff(`${__dirname}/__fixtures__/treeBefore.json`, `${__dirname}/__fixtures__/treeAfter.json`);
const gendiffTestYML = gendiff(`${__dirname}/__fixtures__/treeBefore.yml`, `${__dirname}/__fixtures__/treeAfter.yml`);
const gendiffTestINI = gendiff(`${__dirname}/__fixtures__/treeBefore.ini`, `${__dirname}/__fixtures__/treeAfter.ini`);

const gendiffTestPlainJSON = gendiff(`${__dirname}/__fixtures__/treeBefore.json`, `${__dirname}/__fixtures__/treeAfter.json`, 'plain');
const gendiffTestPlainYML = gendiff(`${__dirname}/__fixtures__/treeBefore.yml`, `${__dirname}/__fixtures__/treeAfter.yml`, 'plain');
const gendiffTestPlainINI = gendiff(`${__dirname}/__fixtures__/treeBefore.ini`, `${__dirname}/__fixtures__/treeAfter.ini`, 'plain');

const gendiffTestJsonJSON = gendiff(`${__dirname}/__fixtures__/treeBefore.json`, `${__dirname}/__fixtures__/treeAfter.json`, 'json');
const gendiffTestJsonYML = gendiff(`${__dirname}/__fixtures__/treeBefore.yml`, `${__dirname}/__fixtures__/treeAfter.yml`, 'json');
const gendiffTestJsonINI = gendiff(`${__dirname}/__fixtures__/treeBefore.ini`, `${__dirname}/__fixtures__/treeAfter.ini`, 'json');


test('gendiff', () => {
  expect(gendiffTestJSON).toEqual(resultTree);
  expect(gendiffTestYML).toEqual(resultTree);
  expect(gendiffTestINI).toEqual(resultTree);

  expect(gendiffTestPlainJSON).toEqual(resultString);
  expect(gendiffTestPlainYML).toEqual(resultString);
  expect(gendiffTestPlainINI).toEqual(resultString);

  expect(gendiffTestJsonJSON).toEqual(resultJSON);
  expect(gendiffTestJsonYML).toEqual(resultYmlJSON);
  expect(gendiffTestJsonINI).toEqual(resultJSON);
});
