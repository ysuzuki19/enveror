import path from 'path';

import { Enveror } from '../enveror';

const defautEnverorObj = {
  STAGE: 'dev',
  CLOUD: {
    API_KEY_ID: 'hogehoge=hog',
    API_SECRET_KEY: 'fug+;l[l;uw:er\\-0-63-096z,nxvcafuga',
    STORAGE: { IMAGES: 'myimages' },
  },
  CORS_ORIGINS: ['http://localhost:3000'],
  WORKER_COUNT: 4,
  TIMEOUT_SECONDS: 2.3,
  EMPTY_STRING: ' ',
  SAMPLE: true,
};

const local_env_path = path.join(process.cwd(), '/.enveror.local');
const localEnverorObj = {
  DEVELOPER: { NAME: 'ysuzuki19' },
  DEFAULT: false,
};

describe('enveror', () => {
  test('default without options', () => {
    const enveror = new Enveror();
    expect(enveror.get('STAGE').as_string()).toBe('dev');
    expect(enveror.to_object()).toEqual(defautEnverorObj);
  });

  test('default with empty object input', () => {
    const enveror = new Enveror({});
    expect(enveror.get('STAGE').as_string()).toBe('dev');
    expect(enveror.to_object()).toEqual(defautEnverorObj);
  });

  test('default + local', () => {
    const enveror = new Enveror({
      routes: [local_env_path],
    });
    expect(enveror.get('STAGE').as_string()).toBe('dev');
    expect(enveror.to_object()).toEqual({
      ...defautEnverorObj,
      ...localEnverorObj,
    });
  });

  test('local', () => {
    const enveror = new Enveror({
      routes: [local_env_path],
      disableDefault: true,
    });
    expect(enveror.to_object()).toEqual(localEnverorObj);
  });

  test('lf', () => {
    const spec_lf_env_path = path.join(process.cwd(), '/.enveror.spec.lf');
    const enveror = new Enveror({
      routes: [spec_lf_env_path],
      disableDefault: true,
    });
    expect(enveror.to_object()).toEqual(defautEnverorObj);
  });
});
