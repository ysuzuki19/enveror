const strRegexp = /^".*"$/;
export function check_string(input: string): boolean {
  return strRegexp.test(input);
}

const intRegexp = /^[0-9]+$/;
const decimalRegexp = /^[0-9]+.[0-9]+$/;
export function check_number(input: string): boolean {
  return intRegexp.test(input) || decimalRegexp.test(input);
}

const arrRegexp = /^\[.*\]$/;
export function check_array(input: string): boolean {
  return arrRegexp.test(input);
}

const emptyRegexp = /^$/;
export function check_empty(input: string): boolean {
  return emptyRegexp.test(input);
}

export default { check_string, check_number, check_array, check_empty };
