const strRegexp = /^".*"$/;
export function is_string(val: string) {
  return strRegexp.test(val);
}

const arrRegexp = /^\[.*\]$/;
export function is_array(val: string) {
  return arrRegexp.test(val);
}

const intRegexp = /^[0-9]+$/;
const decimalRegexp = /^[0-9]+.[0-9]+$/;
export function is_number(val: string) {
  return intRegexp.test(val) || decimalRegexp.test(val);
}

const emptyRegexp = /^$/;
export function is_empty(val: string) {
  return emptyRegexp.test(val);
}

// function check(input: string) {
// }
