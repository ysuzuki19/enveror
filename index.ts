import { Enveror } from './lib/loader';

export function print_root() {
  // const none_env_path = process.cwd() + '/.env';
  const local_env_path = process.cwd() + '/.enveror.local';
  const enveror = new Enveror([local_env_path]);
  console.log(enveror.to_string());
}
print_root();
