export function unsupported_type(t: string): string {
  return `Unsupported Type: (${t})`;
}

export function invalid_type(received: string, expected: string): string {
  return `Invalid Type (${received}) desired (${expected})`;
}

export function env_not_found(filepath: string) {
  return `Not Found env file: (${filepath})`;
}
