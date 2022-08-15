import { parse_unknown_str } from './parser';
import { ValueType, TypeName, TypeNames } from './types';
import validator from './type_validator';

export class Value {
  private readonly val: ValueType | undefined;
  private readonly type_name: TypeName;
  private readonly children: Record<string, Value> = {};

  constructor(raw_str_val?: string | undefined) {
    if (raw_str_val) {
      const [val, type_name] = parse_unknown_str(raw_str_val);
      this.val = val;
      this.type_name = type_name;
    } else {
      this.type_name = 'object';
    }
  }

  public as_any(): ValueType {
    return this.val;
  }

  public as_string(): string {
    validator.validate_type(this.type_name, TypeNames.STRING);
    return this.val as string;
  }

  public as_number(): number {
    validator.validate_type(this.type_name, TypeNames.NUMBER);
    return this.val as number;
  }

  public as_array_string(): string[] {
    validator.validate_type(this.type_name, TypeNames.ARRAY_STRING);
    return this.val as string[];
  }

  public as_array_number(): number[] {
    validator.validate_type(this.type_name, TypeNames.ARRAY_NUMBER);
    return this.val as number[];
  }

  public get(key: string): Value {
    if (ValueHelper.key_is_nested(key)) {
      const [first, next] = ValueHelper.parse_keypath(key);
      return this.children[first].get(next);
    } else {
      return this.children[key] || new Value();
    }
  }

  public keys(): string[] {
    return Object.keys(this.children);
  }

  public to_object(): object | ValueType {
    if (this.type_name === TypeNames.OBJECT) {
      return Object.entries(this.children)
        .map(([k, v]) => ({
          [k]: v.val || v.to_object(),
        }))
        .reduce((p, c) => ({ ...p, ...c }), {});
    } else {
      return this.val;
    }
  }

  public insert(key: string, val: Value) {
    if (ValueHelper.key_is_nested(key)) {
      const [first, next] = ValueHelper.parse_keypath(key);
      if (!this.exist(first)) this.children[first] = new Value();
      this.children[first].insert(next, val);
    } else {
      if (this.exist(key)) throw `duplicate key "${key}"`;
      this.children[key] = val;
    }
  }

  private exist(key: string): boolean {
    return !!this.children[key];
  }
}

class ValueHelper {
  public static key_is_nested(key: string): boolean {
    return key.includes('.');
  }
  public static parse_keypath(key: string): [string, string] {
    const [first, ...others] = key.split('.');
    return [first, others.join('.')];
  }
}
