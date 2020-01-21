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
  expect(gendiff(__dirname.concat('/__fixtures__/afterYML.yml'),
    __dirname.concat('/__fixtures__/beforeYML.yml'))).toEqual({
    ' language': 'node_js',
    '+node_js': ['node'],
    '-script': ['make lint', 'make test'],
    '+script': ['make lint', 'make test', 'make start'],
  });
});
