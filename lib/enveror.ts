import { Value } from './value';
import * as path from 'path';
import file from './file';

const default_env_name = '.enveror';

// type EnverorLogger = (...data: unknown[]) => void;

interface EnverorArgs {
  routes?: string[];
  // logger?: EnverorLogger;
  disableDefault?: boolean;
}

export class Enveror {
  private readonly val = new Value();
  // private readonly logger;

  constructor({
    routes = [],
    // logger = () => null,
    disableDefault = false,
  }: EnverorArgs) {
    // this.logger = logger;
    if (!disableDefault) {
      const default_env_path = path.join(process.cwd(), default_env_name);
      if (!routes.includes(default_env_path)) {
        routes = [default_env_path, ...routes];
      }
    }
    routes.forEach((route) => this.#merge(route));
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

  #merge(route: string) {
    const parsed = file.parse(route);
    parsed.forEach(([k, v]) => this.val.insert(k, new Value(v)));
  }
}
