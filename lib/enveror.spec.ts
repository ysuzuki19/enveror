// import config from './.enveror.config';
import path from 'path';
import { Enveror } from './enveror';

describe('enveror', () => {
  test('sample', () => {
    expect(1).toBe(1);
    const local_env_path = path.join(process.cwd(), '.enveror.local');
    const enveror = new Enveror({ routes: [local_env_path] });
    // console.dir(enveror.to_string());
  });
});
