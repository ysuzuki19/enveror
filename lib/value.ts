import { parse_unknown_str } from './parser';
import { ValueType, TypeName, TypeNames } from './types';
import validator from './type_validator';

export class Value {
  val: ValueType | undefined;
  type_name: TypeName;
  children: Record<string, Value> = {};

  constructor(val_?: string | undefined) {
    if (val_) {
      const [val, type_name] = parse_unknown_str(val_);
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
    console.log(this.val, this.type_name);
    validator.validate_type(this.type_name, TypeNames.ARRAY_NUMBER);
    return this.val as number[];
  }

  public child(key: string): Value {
    validator.validate_type(this.type_name, TypeNames.OBJECT);
    return this.children[key];
  }

  public push(key: string, val: Value) {
    if (key.includes('.')) {
      const [first, ...others] = key.split('.');
      if (!this.children[first]) this.children[first] = new Value();
      this.children[first].push(others.join('.'), val);
    } else {
      if (this.children[key]) throw `duplicate key "${key}"`;
      this.children[key] = val;
    }
  }
}
