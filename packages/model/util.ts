export type ValueOf<T> = T[keyof T];

export type NoNullFields<O> = { [K in keyof O]: NonNullable<O[K]> };

export type DeepNoNullFields<T> = {
  [K in keyof T]: DeepNoNullFields<NonNullable<T[K]>>;
};

export type RequiredPartial<O, T extends keyof O> = Partial<O> & Required<Pick<O, T>>;

// Analogues to array.prototype.shift
export type Shift<T extends unknown[]> = ((...t: T) => unknown) extends (first: unknown, ...rest: infer Rest) => unknown
  ? Rest
  : never;

// use a distributed conditional type here
type ShiftUnion<T> = T extends unknown[] ? Shift<T> : never;

// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepRequired<T, P extends string[]> = T extends object
  ? Omit<T, Extract<keyof T, P[0]>> &
      Required<
        {
          [K in Extract<keyof T, P[0]>]: NonNullable<DeepRequired<T[K], ShiftUnion<P>>>;
        }
      >
  : T;
