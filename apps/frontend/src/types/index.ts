export type ReplaceDateWithString<T> = T extends Date
  ? string
  : T extends Array<infer A>
    ? Array<ReplaceDateWithString<A>>
    : T extends Record<string, unknown>
      ? { [K in keyof T]: ReplaceDateWithString<T[K]> }
      : T;
