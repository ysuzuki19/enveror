import { check_array, check_number, check_string } from '../checker';
import { TestIOs } from '../__mock__';

function checker_tester(
  callback_name: string,
  callback: (i: string) => boolean,
  cases: TestIOs<string, boolean>
) {
  cases.forEach((value) => {
    test(`${callback_name}(${value.input}) => ${value.output}`, () => {
      expect(callback(value.input)).toBe(value.output);
    });
  });
}

const cases: { input: string; answer: string }[] = [
  { input: ' ""', answer: '_' },
  { input: ' 40', answer: '_' },
  { input: '"" ', answer: '_' },
  { input: '""', answer: 'string' },
  { input: '""hoge"', answer: 'string' },
  { input: '"3.14"', answer: 'string' },
  { input: '"hoge"', answer: 'string' },
  { input: '', answer: 'empty' },
  { input: '0', answer: 'number' },
  { input: '0123456789', answer: 'number' },
  { input: '1', answer: 'number' },
  { input: '2', answer: 'number' },
  { input: '3', answer: 'number' },
  { input: '3', answer: 'number' },
  { input: '3', answer: 'number' },
  { input: '3.14', answer: 'number' },
  { input: '3.14', answer: 'number' },
  { input: '4', answer: 'number' },
  { input: '40 ', answer: '_' },
  { input: '5', answer: 'number' },
  { input: '6', answer: 'number' },
  { input: '7', answer: 'number' },
  { input: '8', answer: 'number' },
  { input: '9', answer: 'number' },
  { input: '["3.14"]', answer: 'array' },
  { input: '[3.14]', answer: 'array' },
  { input: '{num:40}', answer: '_' },
];

checker_tester(
  'check_string()',
  check_string,
  cases.map((value) => ({
    input: value.input,
    output: value.answer === 'string',
  }))
);

checker_tester(
  'check_number()',
  check_number,
  cases.map((value) => ({
    input: value.input,
    output: value.answer === 'number',
  }))
);

checker_tester(
  'check_array()',
  check_array,
  cases.map((value) => ({
    input: value.input,
    output: value.answer === 'array',
  }))
);
