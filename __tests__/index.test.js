import gendiff from '../src';

test('gendiff', () => {
  expect(gendiff('/home/ebces/one.json', '/home/ebces/two.json')).toEqual({
    ' host': 'hexlet.io',
    '-timeout': 50,
    '+timeout': 20,
    '-proxy': '123.234.53.22',
    '-follow': false,
    '+verbose': true,
  });
});
