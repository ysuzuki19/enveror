import {
  env_not_found,
  invalid_type,
  unsupported_type,
} from '../exception_message';

test('unsupported_type()', () => {
  expect(unsupported_type('')).toBe(`Unsupported Type: ()`);
});

test('unsupported_type(hoge)', () => {
  expect(unsupported_type('hoge')).toBe(`Unsupported Type: (hoge)`);
});

test('invalid_type()', () => {
  expect(invalid_type('', '')).toBe(`Invalid Type () desired ()`);
});

test('invalid_type(a,b)', () => {
  expect(invalid_type('a', 'b')).toBe(`Invalid Type (a) desired (b)`);
});

test('env_not_found()', () => {
  expect(env_not_found('')).toBe(`Not Found env file: ()`);
});

test('env_not_found(hoge)', () => {
  expect(env_not_found('hoge')).toBe(`Not Found env file: (hoge)`);
});
