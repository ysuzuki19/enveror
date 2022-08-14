import { Value } from '../value';

describe('assertions', () => {
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
});

describe('object mode', () => {
  test('basic insert/get', () => {
    const root = new Value();
    root.insert('HOGE', new Value('"hoge"'));
    expect(root.get('HOGE').as_string()).toBe('hoge');
  });

  test('various-type insert/get', () => {
    const root = new Value();
    const hoge_key = 'HOGE';
    const hoge_str = '"hoge"';
    root.insert(hoge_key, new Value(hoge_str));
    const hoge_res = root.get(hoge_key);
    expect(hoge_res.as_string()).toBe('hoge');

    const num_3_key = 'NUM_3';
    root.insert(num_3_key, new Value('3'));
    expect(root.get(num_3_key).as_number()).toBe(3);

    const arr_str_key = 'ARR_HOGE_FUGA';
    root.insert(arr_str_key, new Value('["hoge","fuga"]'));
    expect(root.get(arr_str_key).as_array_string()).toEqual(['hoge', 'fuga']);

    const arr_num_key = 'ARR_1_3';
    root.insert(arr_num_key, new Value('[1, 3]'));
    expect(root.get(arr_num_key).as_array_number()).toEqual([1, 3]);
  });

  test('keys()', () => {
    const root = new Value();
    root.insert('HOGE', new Value('"hoge"'));
    root.insert('NUM_3', new Value('3'));
    expect(root.keys()).toEqual(['HOGE', 'NUM_3']);
  });

  test('nested', () => {
    const root = new Value();
    root.insert('HOGE.FUGA', new Value('"hogefuga"'));
    expect(root.get('HOGE').get('FUGA').as_string()).toBe('hogefuga');
  });

  test('object mode shorthand-access', () => {
    const root = new Value();
    root.insert('HOGE.FUGA', new Value('"hogefuga"'));
    expect(root.get('HOGE.FUGA').as_string()).toBe('hogefuga');
  });

  test('object mode nested unknown', () => {
    const root = new Value();
    expect(root.get('HOGE').get('FUGA')).toEqual(new Value());
  });
});
