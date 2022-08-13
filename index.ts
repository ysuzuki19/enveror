import path from 'path';
import { Enveror } from './lib/enveror';

export function print_root() {
  const local_env_path = path.join(process.cwd() + '/.enveror.local');
  const enveror = new Enveror({ routes: [local_env_path] });
  // const stage = enveror['STAGE'];
  const stage = enveror.get('STAGE');
  console.log(stage.as_string());
  // console.dir(enveror.to_string());
}
print_root();
