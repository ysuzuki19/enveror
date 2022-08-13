import { TypeName, TypeNames, ValueType } from '../types';
import { detectTypeName } from '../type_detector';
import { TestIOs } from '../__mock__';

(
  [
    { input: 'hoge', output: TypeNames.STRING },
    { input: '0', output: TypeNames.STRING },
    { input: '', output: TypeNames.STRING },
    { input: undefined, output: TypeNames.UNDEFINED },
    { input: 0, output: TypeNames.NUMBER },
    { input: 0.1, output: TypeNames.NUMBER },
    { input: -100, output: TypeNames.NUMBER },
    { input: [''], output: TypeNames.ARRAY_STRING },
    { input: [0], output: TypeNames.ARRAY_NUMBER },
  ] as TestIOs<ValueType, TypeName>
).forEach((io) => {
  test(`${typeof io.input} => ${io.output}`, () => {
    expect(detectTypeName(io.input)).toBe(io.output);
  });
});
