import { Value } from '../value';

test('"hoge" => as_string() => "hoge"', () => {
  const value = new Value('"hoge"');
  const res = value.as_string();
  expect(res).toBe('hoge');
});

test('3 => as_number() => 3', () => {
  const value = new Value('3');
  const res = value.as_number();
  expect(res).toBe(3);
});

test('["1","hoge"] => as_array_number() => ["1","hoge"]', () => {
  const value = new Value('["1","hoge"]');
  const res = value.as_array_string();
  expect(res).toEqual(['1', 'hoge']);
});

test('[1,3] => as_array_number() => [1,3]', () => {
  const value = new Value('[1,3]');
  const res = value.as_array_number();
  expect(res).toEqual([1, 3]);
});

test('[1,3] => as_array_number() => [1,3]', () => {
  const value = new Value('[1,3]');
  const res = value.as_array_number();
  expect(res).toEqual([1, 3]);
});

test('as_any()', () => {
  expect(new Value('"hoge"').as_any()).toBe('hoge');
  expect(new Value('4').as_any()).toBe(4);
  expect(new Value('[1,3]').as_any()).toEqual([1, 3]);
  expect(new Value('["1","hoge"]').as_any()).toEqual(['1', 'hoge']);
});

test('object mode', () => {
  const value = new Value();
  value.push('HOGE', new Value('"hoge"'));
  expect(value.child('HOGE').as_string()).toBe('hoge');
  value.push('NUM_3', new Value('3'));
  expect(value.child('NUM_3').as_number()).toBe(3);
  value.push('ARR_HOGE_FUGA', new Value('["hoge","fuga"]'));
  expect(value.child('ARR_HOGE_FUGA').as_array_string()).toEqual([
    'hoge',
    'fuga',
  ]);
  value.push('ARR_1_3', new Value('[1, 3]'));
  expect(value.child('ARR_1_3').as_array_number()).toEqual([1, 3]);
});

test('object mode nested', () => {
  const value = new Value();
  value.push('HOGE.HOGE', new Value('"hoge"'));
  expect(value.child('HOGE').child('HOGE').as_string()).toBe('hoge');
});
