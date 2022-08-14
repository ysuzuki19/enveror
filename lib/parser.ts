import { ValueType, TypeName, TypeNames } from './types';
import { detectArrayTypeName } from './type_detector';
import { check_array, check_number, check_string } from './checker';
import { unsupported_type } from './exception_message';

export function parse_unknown_str(input: string): [ValueType, TypeName] {
  if (check_string(input)) return [input.slice(1, -1), TypeNames.STRING];
  if (check_number(input)) return [+input, TypeNames.NUMBER];
  if (check_array(input)) {
    const parsed = JSON.parse(input);
    return [parsed, detectArrayTypeName(parsed)];
  }
  throw unsupported_type(input);
}

export default { parse_unknown_str };
