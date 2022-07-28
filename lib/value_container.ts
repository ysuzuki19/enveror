import { is_array, is_number, is_string } from './type_validator';

type ValueName =
  | 'undefined'
  | 'string'
  | 'number'
  | 'array_string'
  | 'array_number';
type Value = undefined | string | number | string[] | number[];

export class ValueContainer {
  val: Value;
  val_type: ValueName;

  constructor(val_: string) {
    const [val, val_name] = this.#parse_value(val_);
    this.val = val;
    this.val_type = val_name;
  }

  as_any(): Value {
    return this.val;
  }

  as_string(): string {
    if (this.val_type !== 'string') {
      throw this.#error_msg(this.val_type, 'string');
    }
    return this.val as string;
  }

  #error_msg(received: string, expected: string): string {
    return `Invalid Type ${received} desired ${expected}`;
  }

  #parse_value(input: string): [Value, ValueName] {
    if (is_string(input)) {
      console.log(input, 'is string');
      return [input.slice(1, -1), 'string'];
    }
    if (is_array(input)) {
      console.log(input, 'is arr');
      return [JSON.parse(input), 'array_string'];
    }
    if (is_number(input)) {
      console.log(input, 'is number');
      return [+input, 'number'];
    }
    console.log(input, 'is empty');
    return [undefined, 'undefined'];
  }
}
