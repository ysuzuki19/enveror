import { invalid_type } from './exception_message';
import { TypeName } from './types';
// import { detectTypeName } from './type_detector';

// export function validate_supported(input: unknown) {
//   detectTypeName(input);
// }

export function validate_type(input: string, expected: TypeName) {
  if (input !== expected) {
    throw invalid_type(input, expected);
  }
}

export default { validate_type };
