import type { ZodAny } from "zod";

export type TMatcher<T = any> = [
  string | number | boolean | Symbol | RegExp | Function | ZodAny,
  T | ((p: any) => T)
];

export const DEFAULT = Symbol("##__PERFECT__MATCH__##");

export function match<T = any>(...matchers: TMatcher<T>[]) {
  function unwrap<T = any>(wrapped: T | ((p: any) => T), val: any): T {
    if (typeof wrapped == "function") {
      return (wrapped as (p: any) => T)(val);
    }
    return wrapped;
  }

  return function (val: any): T | undefined {
    for (const [matcher, option] of matchers) {
      const typeOfMatcher = typeof matcher;
      const typeOfVal = typeof val;

      if (
        typeof matcher == "symbol" &&
        Symbol.keyFor(matcher) == Symbol.keyFor(DEFAULT)
      ) {
        return unwrap(option, val);
      }

      if (
        (typeOfMatcher == "boolean" ||
          typeOfMatcher == "number" ||
          typeOfMatcher == "string" ||
          typeOfMatcher == "symbol") &&
        matcher === val
      ) {
        return unwrap(option, val);
      }

      if (
        matcher instanceof RegExp &&
        typeOfVal == "string" &&
        (val as string).match(matcher)
      ) {
        return unwrap(option, val);
      }

      if (typeOfMatcher == "function" && (matcher as (p: any) => any)(val)) {
        return unwrap(option, val);
      }

      if ((matcher as ZodAny).safeParse(val).success) {
        return unwrap(option, val);
      }
    }
  };
}
