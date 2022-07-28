import path from 'path';
import { Enveror } from './lib/enveror';

export function print_root() {
  // const none_env_path = process.cwd() + '/.env';
  const local_env_path = path.join(process.cwd() + '/.enveror.local');
  const enveror = new Enveror({ routes: [local_env_path] });
  console.dir(enveror.to_string());
}
print_root();
