export interface TestIO<TI, TO> {
  input: TI;
  output: TO;
}

export type TestIOs<TI, TO> = TestIO<TI, TO>[];
