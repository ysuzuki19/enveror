import parser from './parser';
import { ValueContainer } from './value_container';

export interface EnverorVars {
  [key: string]: ValueContainer | EnverorVars;
}

export interface EnverorProps {
  routes?: string[];
}

export class Enveror {
  public vars: EnverorVars = {};

  constructor({ routes = [] }: EnverorProps) {
    const default_env_path = process.cwd() + '/.enveror';
    if (!routes.includes(default_env_path)) {
      routes = [default_env_path, ...routes];
    }
    routes.forEach((route) => this.#merge(route));
  }

  #merge(route: string) {
    const parsed = parser.parseFile(route);
    parsed.forEach(([k, v]) => this.#push(k, new ValueContainer(v)));
  }

  #push(key: string, val: ValueContainer, target = this.vars) {
    if (key.includes('.')) {
      const [first, ...others] = key.split('.');
      if (!target[first]) target[first] = {};
      this.#push(others.join('.'), val, target[first] as EnverorVars);
    } else {
      if (target[key]) throw `duplicate key "${key}"`;
      target[key] = val;
    }
  }

  public stringify() {
    return JSON.stringify(this.vars);
  }

  public to_string() {
    return JSON.parse(JSON.stringify(this.vars));
  }
}
