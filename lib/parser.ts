export function parseLine({
  line,
  delm = '=',
}: {
  line: string;
  delm?: string;
}) {
  const idx = line.indexOf(delm);
  const key = line.slice(0, idx).trim();
  const val = line.slice(idx + 1).trim();
  return [key, val];
}

export function parseLines(lines: string) {
  return lines.split('\n').map((line) => parseLine({ line }));
}

export default {
  parseLine,
  parseLines,
};
