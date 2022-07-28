import fs from 'fs';

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
  return lines.split('\n').map((line) => parseLine({ line }));
}

function checkFileExist(route: string) {
  const exist = fs.existsSync(route);
  if (!exist) throw `env file ("${route}") not found`;
}

export function parseFile(route: string) {
  checkFileExist(route);
  const file = fs.readFileSync(route).toString();
  const parsed = parseLines(file);
  return parsed;
}

export default {
  parseLine,
  parseLines,
  parseFile,
};
