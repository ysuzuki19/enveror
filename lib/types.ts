export enum TypeNames {
  UNDEFINED = 'undefined',
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  ARRAY_STRING = 'array_string',
  ARRAY_NUMBER = 'array_number',
  OBJECT = 'object',
}

export type TypeName = `${TypeNames}`;
export type ValueType =
  | undefined
  | string
  | number
  | boolean
  | string[]
  | number[]
  | object;
