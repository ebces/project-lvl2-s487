import gendiff from '../src';

test('gendiff', () => {
  expect(gendiff(__dirname.concat('/before.json'),
    __dirname.concat('/after.json'))).toEqual({
    ' host': 'hexlet.io',
    '-timeout': 50,
    '+timeout': 20,
    '-proxy': '123.234.53.22',
    '-follow': false,
    '+verbose': true,
  });
});
