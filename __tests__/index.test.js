import gendiff from '../src';

test('gendiff', () => {
  expect(gendiff(__dirname.concat('/__fixtures__/before.json'),
    __dirname.concat('/__fixtures__/after.json'))).toEqual({
    ' host': 'hexlet.io',
    '-timeout': 50,
    '+timeout': 20,
    '-proxy': '123.234.53.22',
    '-follow': false,
    '+verbose': true,
  });
  expect(gendiff(__dirname.concat('/__fixtures__/before.yml'),
    __dirname.concat('/__fixtures__/after.yml'))).toEqual({
    ' host': 'hexlet.io',
    '-timeout': 50,
    '+timeout': 20,
    '-proxy': '123.234.53.22',
    '-follow': false,
    '+verbose': true,
  });
  expect(gendiff(__dirname.concat('/__fixtures__/before.ini'),
    __dirname.concat('/__fixtures__/after.ini'))).toEqual({
    ' host': 'hexlet.io',
    '-timeout': '50',
    '+timeout': '20',
    '-proxy': '123.234.53.22',
    '-follow': false,
    '+verbose': true,
  });

  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.json'),
    __dirname.concat('/__fixtures__/treeAfter.json'))).toEqual({
    ' common':
    {
      ' setting1': 'Value 1',
      '-setting2': '200',
      '-setting3': true,
      '+setting3': { key: 'value' },
      ' setting6': { ' key': 'value', '+ops': 'vops' },
      '+follow': false,
      '+setting4': 'blah blah',
      '+setting5': { key5: 'value5' },
    },
    ' group1':
    {
      '-baz': 'bas',
      '+baz': 'bars',
      ' foo': 'bar',
      '-nest': { key: 'value' },
      '+nest': 'str',
    },
    '-group2': { abc: '12345' },
    '+group3': { fee: '100500' },
  });
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.yml'),
    __dirname.concat('/__fixtures__/treeAfter.yml'))).toEqual({
    ' common':
    {
      ' setting1': 'Value 1',
      '-setting2': 200,
      '-setting3': true,
      '+setting3': { key: 'value' },
      ' setting6': { ' key': 'value', '+ops': 'vops' },
      '+follow': false,
      '+setting4': 'blah blah',
      '+setting5': { key5: 'value5' },
    },
    ' group1':
    {
      '-baz': 'bas',
      '+baz': 'bars',
      ' foo': 'bar',
      '-nest': { key: 'value' },
      '+nest': 'str',
    },
    '-group2': { abc: 12345 },
    '+group3': { fee: 100500 },
  });
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.ini'),
    __dirname.concat('/__fixtures__/treeAfter.ini'))).toEqual({
    ' common':
    {
      ' setting1': 'Value 1',
      '-setting2': '200',
      '-setting3': true,
      '+setting3': { key: 'value' },
      ' setting6': { ' key': 'value', '+ops': 'vops' },
      '+follow': false,
      '+setting4': 'blah blah',
      '+setting5': { key5: 'value5' },
    },
    ' group1':
    {
      '-baz': 'bas',
      '+baz': 'bars',
      ' foo': 'bar',
      '-nest': { key: 'value' },
      '+nest': 'str',
    },
    '-group2': { abc: '12345' },
    '+group3': { fee: '100500' },
  });
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.json'),
    __dirname.concat('/__fixtures__/treeAfter.json'), 'plain')).toEqual(['Property "common.setting2" was removed',
    'Property "common.setting3" was updated. From "true" to [complex value]',
    'Property "common. setting6.ops" was added with value: "vops"',
    'Property "common.follow" was added with value: "false"',
    'Property "common.setting4" was added with value: "blah blah"',
    'Property "common.setting5" was added with value: [complex value]',
    'Property "group1.baz" was updated. From "bas" to "bars"',
    'Property "group1.nest" was updated. From [complex value] to "str"',
    'Property "group2" was removed',
    'Property "group3" was added with value: [complex value]']);
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.yml'),
    __dirname.concat('/__fixtures__/treeAfter.yml'), 'plain')).toEqual(['Property "common.setting2" was removed',
    'Property "common.setting3" was updated. From "true" to [complex value]',
    'Property "common. setting6.ops" was added with value: "vops"',
    'Property "common.follow" was added with value: "false"',
    'Property "common.setting4" was added with value: "blah blah"',
    'Property "common.setting5" was added with value: [complex value]',
    'Property "group1.baz" was updated. From "bas" to "bars"',
    'Property "group1.nest" was updated. From [complex value] to "str"',
    'Property "group2" was removed',
    'Property "group3" was added with value: [complex value]']);
  expect(gendiff(__dirname.concat('/__fixtures__/treeBefore.ini'),
    __dirname.concat('/__fixtures__/treeAfter.ini'), 'plain')).toEqual(['Property "common.setting2" was removed',
    'Property "common.setting3" was updated. From "true" to [complex value]',
    'Property "common. setting6.ops" was added with value: "vops"',
    'Property "common.follow" was added with value: "false"',
    'Property "common.setting4" was added with value: "blah blah"',
    'Property "common.setting5" was added with value: [complex value]',
    'Property "group1.baz" was updated. From "bas" to "bars"',
    'Property "group1.nest" was updated. From [complex value] to "str"',
    'Property "group2" was removed',
    'Property "group3" was added with value: [complex value]']);
});
