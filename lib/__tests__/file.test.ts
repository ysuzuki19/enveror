import * as path from 'path';

import { parseLine, parseLines, checkExist, parse } from '../file';
import { TestIOs } from '../__mock__';

describe('checkExist()', () => {
  test('".enveror" => true', () => {
    expect(checkExist(path.join(process.cwd(), '.enveror'))).toBe(true);
  });

  test('".envo" => false', () => {
    expect(checkExist(path.join(process.cwd(), '.envo'))).toBe(false);
  });
});

describe('parseLine()', () => {
  (
    [
      {
        input: 'hoge = fuga',
        output: ['hoge', 'fuga'],
      },
      {
        input: 'hoge =0',
        output: ['hoge', '0'],
      },
      {
        input: 'hoge= 100',
        output: ['hoge', '100'],
      },
      {
        input: 'hoge = "fua"',
        output: ['hoge', '"fua"'],
      },
      {
        input: 'hoge = ["fua"]',
        output: ['hoge', '["fua"]'],
      },
    ] as TestIOs<string, [string, string]>
  ).forEach((io) => {
    test(`(${io.input}) => ${io.output}`, () => {
      const result = parseLine({ line: io.input });
      expect(result).toEqual(io.output);
    });
  });
});

const enveror_sample = `STAGE = "dev" 
CLOUD.API_KEY_ID = "hogehoge=hog"
CLOUD.API_SECRET_KEY = "fug+;l[l;uw:er\\-0-63-096z,nxvcafuga"
CLOUD.STORAGE.IMAGES = "myimages"
API.CORS_ORIGIN =["http://localhost:3000"]
WORKER_COUNT =4
TIMEOUT_SECONDS= 2.3
EMPTY_STRING=" "`;

const enveror_sample_lf = `
STAGE = "dev" 
CLOUD.API_KEY_ID = "hogehoge=hog"
CLOUD.API_SECRET_KEY = "fug+;l[l;uw:er\\-0-63-096z,nxvcafuga"
CLOUD.STORAGE.IMAGES = "myimages"
API.CORS_ORIGIN =["http://localhost:3000"]
WORKER_COUNT =4
TIMEOUT_SECONDS= 2.3
EMPTY_STRING=" "
`;

const enveror_sample_out = [
  ['STAGE', '"dev"'],
  ['CLOUD.API_KEY_ID', '"hogehoge=hog"'],
  ['CLOUD.API_SECRET_KEY', '"fug+;l[l;uw:er\\-0-63-096z,nxvcafuga"'],
  ['CLOUD.STORAGE.IMAGES', '"myimages"'],
  ['API.CORS_ORIGIN', '["http://localhost:3000"]'],
  ['WORKER_COUNT', '4'],
  ['TIMEOUT_SECONDS', '2.3'],
  ['EMPTY_STRING', '" "'],
];

describe('parseLines()', () => {
  test('sample => sample_out', () => {
    const res = parseLines(enveror_sample);
    expect(res).toEqual(enveror_sample_out);
  });

  test('sample_lf => sample_out', () => {
    const res = parseLines(enveror_sample_lf);
    expect(res).toEqual(enveror_sample_out);
  });
});

describe('parse()', () => {
  test('.enveror.spec => {...}', () => {
    const res = parse(path.join(process.cwd(), '.enveror.spec'));
    expect(res).toEqual(enveror_sample_out);
  });

  test('.enveror.spec.lf => {...}', () => {
    const res = parse(path.join(process.cwd(), '.enveror.spec.lf'));
    expect(res).toEqual(enveror_sample_out);
  });
});
