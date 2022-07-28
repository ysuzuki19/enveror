import fs from 'fs';

import parser from './parser';
import { ValueContainer } from './value_container';

export interface EnverorVars {
  [key: string]: ValueContainer | EnverorVars;
}

export class Enveror {
  public vars: EnverorVars = {};

  constructor(routes = [] as string[]) {
    const default_env_path = process.cwd() + '/.enveror';
    if (!routes.includes(default_env_path)) {
      routes = [default_env_path, ...routes];
    }
    routes.forEach((route) => this.#merge(route));
  }

  #checkFileExist(route: string) {
    const exist = fs.existsSync(route);
    if (!exist) throw `env file ("${route}") not found`;
  }

  #merge(route: string) {
    this.#checkFileExist(route);
    const file = fs.readFileSync(route).toString();
    const parsed = parser.parseLines(file);
    parsed.forEach(([key, val]) => {
      this.#push(key, new ValueContainer(val));
    });
  }

  #push(key: string, val: ValueContainer, target = this.vars) {
    if (key.includes('.')) {
      const splitted = key.split('.');
      const outer = splitted[0];
      if (!target[outer]) target[outer] = {};
      this.#push(
        splitted.slice(1).join('.'),
        val,
        target[outer] as EnverorVars
      );
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
