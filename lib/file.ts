import fs from 'fs';
import { env_not_found } from './exception_message';

export function parseLine({
  line,
  delm = '=',
}: {
  line: string;
  delm?: string;
}): [string, string] {
  const idx = line.indexOf(delm);
  const key = line.slice(0, idx).trim();
  const val = line.slice(idx + 1).trim();
  return [key, val];
}

export function parseLines(lines: string): [string, string][] {
  return lines
    .split('\n')
    .map((line) => parseLine({ line }))
    .filter(([key]) => key);
}

export function checkExist(route: string): boolean {
  return fs.existsSync(route);
}

export function parse(route: string) {
  if (!checkExist(route)) throw env_not_found(route);
  const file = fs.readFileSync(route).toString();
  const parsed = parseLines(file);
  return parsed;
}

export default { parse };
