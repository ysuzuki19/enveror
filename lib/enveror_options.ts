// type EnverorLogger = (...data: unknown[]) => void;

export interface EnverorOptions {
  routes: string[];
  // logger: EnverorLogger;
  disableDefault: boolean;
}

const defaultEnverorOptions: EnverorOptions = {
  routes: [],
  // logger : () => null,
  disableDefault: false,
};

export function defaultize(options: Partial<EnverorOptions>): EnverorOptions {
  return { ...defaultEnverorOptions, ...options };
}
