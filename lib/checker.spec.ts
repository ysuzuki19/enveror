import {
  check_array,
  check_empty,
  check_number,
  check_string,
} from './checker';

type TestCase = [string, boolean]; // [input, result]

function checker_tester(
  callback_name: string,
  callback: (i: string) => boolean,
  cases: TestCase[]
) {
  describe(callback_name, () => {
    for (let i = 0; i < cases.length; i += 1) {
      test(`(${cases[i][0]}) => ${cases[i][1]}`, () => {
        expect(callback(cases[i][0])).toBe(cases[i][1]);
      });
    }
  });
}

const all_cases: {
  input: string;
  answer: string;
}[] = [
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

function create_specify_cases(expected: string): TestCase[] {
  const cases: TestCase[] = [];
  for (let i = 0; i < all_cases.length; i += 1) {
    cases.push([all_cases[i].input, all_cases[i].answer === expected]);
  }
  return cases;
}

checker_tester(
  'checker.check_string()',
  check_string,
  create_specify_cases('string')
);

checker_tester(
  'checker.check_number()',
  check_number,
  create_specify_cases('number')
);

checker_tester(
  'checker.check_array()',
  check_array,
  create_specify_cases('array')
);

checker_tester(
  'checker.check_empty()',
  check_empty,
  create_specify_cases('empty')
);
