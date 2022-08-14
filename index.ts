import path from 'path';
import { Enveror } from './lib/enveror';

const local_env_path = path.join(process.cwd() + '/.enveror.local');
const enveror = new Enveror({ routes: [local_env_path] });
console.dir(enveror.to_object());
