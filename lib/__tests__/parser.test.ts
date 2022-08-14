import { parse_unknown_str } from '../parser';
import { TypeName, TypeNames, ValueType } from '../types';
import { TestIOs } from '../__mock__';

describe('parse_unknown_str()', () => {
  (
    [
      { input: '""', output: ['', TypeNames.STRING] },
      { input: '"hoge"', output: ['hoge', TypeNames.STRING] },
      { input: '4', output: [4, TypeNames.NUMBER] },
      { input: '4.2', output: [4.2, TypeNames.NUMBER] },
      { input: '["hoge"]', output: [['hoge'], TypeNames.ARRAY_STRING] },
      { input: '[1]', output: [[1], TypeNames.ARRAY_NUMBER] },
      { input: '[1,3]', output: [[1, 3], TypeNames.ARRAY_NUMBER] },
    ] as TestIOs<string, [ValueType, TypeName]>
  ).forEach((value) => {
    test(`(${value.input}) => ${value.output}`, () => {
      const res = parse_unknown_str(value.input);
      expect(res).toEqual(value.output);
    });
  });
});
