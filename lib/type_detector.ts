import match from '@ysuzuki19/match.ts';
import { unsupported_type } from './exception_message';
import { TypeName, TypeNames } from './types';

export function detectTypeName(input: unknown): TypeName {
  const t = typeof input;
  if (t === 'object') {
    if (Array.isArray(input)) {
      return detectArrayTypeName(input);
    } else {
      throw unsupported_type(t);
    }
  } else {
    return match<TypeName>(t, {
      [TypeNames.STRING]: () => TypeNames.STRING,
      [TypeNames.NUMBER]: () => TypeNames.NUMBER,
      [TypeNames.UNDEFINED]: () => TypeNames.UNDEFINED,
      _: () => {
        throw unsupported_type(t);
      },
    });
  }
}

export function detectArrayTypeName(input: unknown[]): TypeName {
  if (input.length === 0) throw unsupported_type(`empty Array`);
  const t = typeof input[0];
  return match<TypeName>(t, {
    [TypeNames.STRING]: () => TypeNames.ARRAY_STRING,
    [TypeNames.NUMBER]: () => TypeNames.ARRAY_NUMBER,
    _: () => {
      throw unsupported_type(`Array<${t}>`);
    },
  });
}
