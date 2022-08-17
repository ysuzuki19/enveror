import { Value } from './value';
import * as path from 'path';
import file from './file';
import { defaultize, EnverorOptions } from './enveror_options';

const default_env_name = '.enveror';

export class Enveror {
  private readonly val = new Value();

  constructor(options: Partial<EnverorOptions> = {}) {
    const truth_options = defaultize(options);
    const { disableDefault } = truth_options;
    let { routes } = truth_options;

    if (!disableDefault) {
      const default_env_path = path.join(process.cwd(), default_env_name);
      if (!routes.includes(default_env_path)) {
        routes = [default_env_path, ...routes];
      }
    }

    routes.forEach((route) => {
      file.parse(route).forEach(([k, v]) => this.val.insert(k, new Value(v)));
    });
  }

  public get(key: string) {
    return this.val.get(key);
  }

  public keys(): string[] {
    return this.val.keys();
  }

  public to_object() {
    return this.val.to_object();
  }

  public to_string() {
    return JSON.stringify(this.to_object());
  }
}
