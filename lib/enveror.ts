import { Value } from './value';
import * as path from 'path';
import file from './file';

const default_env_name = '.enveror';

type EnverorLogger = (...data: unknown[]) => void;

interface EnverorArgs {
  routes?: string[];
  logger?: EnverorLogger;
  disableDefault?: boolean;
}

export class Enveror {
  vals: Record<string, Value> = {};
  private logger;

  constructor({
    routes = [],
    logger = console.log,
    disableDefault = false,
  }: EnverorArgs) {
    this.logger = logger;
    if (!disableDefault) {
      const default_env_path = path.join(process.cwd(), default_env_name);
      if (!routes.includes(default_env_path)) {
        routes = [default_env_path, ...routes];
      }
    }
    routes.forEach((route) => this.#merge(route));
  }

  valueOf(key: string) {
    console.log(key);
    return this.vals[key];
  }

  public get(key: string) {
    console.log(key);
    return this.vals[key];
  }

  public keys(): string[] {
    return Object.keys(this.vals);
  }

  #merge(route: string) {
    const parsed = file.parse(route);
    parsed.forEach(([k, v]) => this.#push(k, new Value(v)));
  }

  #push(key: string, val: Value) {
    if (key.includes('.')) {
      const [first, ...others] = key.split('.');
      if (!this.vals[first]) this.vals[first] = new Value();
      this.vals[first].push(others.join('.'), val);
    } else {
      if (this.vals[key]) throw `duplicate key "${key}"`;
      this.vals[key] = val;
    }
  }

  public stringify() {
    return JSON.stringify(this.vals);
  }

  public to_string() {
    return JSON.parse(JSON.stringify(this.vals));
  }
}
