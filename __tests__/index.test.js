import gendiff from '../src';

test('gendiff', () => {
  expect(gendiff('/home/ebces/project-lvl2-s487/__tests__/__fixtures__/before.json',
   '/home/ebces/project-lvl2-s487/__tests__/__fixtures__/after.json')).toEqual({
    ' host': 'hexlet.io',
    '-timeout': 50,
    '+timeout': 20,
    '-proxy': '123.234.53.22',
    '-follow': false,
    '+verbose': true,
  });
});
