import gendiff from '../src';

test('gendiff', () => {
  expect(gendiff('__dirname/before.json',
    '__dirname/after.json')).toEqual({
    ' host': 'hexlet.io',
    '-timeout': 50,
    '+timeout': 20,
    '-proxy': '123.234.53.22',
    '-follow': false,
    '+verbose': true,
  });
});
