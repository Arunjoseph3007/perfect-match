# Perfect match

A simple pattern matcing library

## Ultimate API

```ts
import { DEFAULT, match } from "perfect-match";
import z from "zod";

const matcher = match(
  // String Literal
  ["some string", "Option 1"],
  ["some other string", "Option 2"],
  // Number Literals
  [123, "Option 3"],
  // Boolean iteral Literals
  [true, "Option 4"],
  // Result can also be return value of a function
  ["func", () => "Option 5"],
  // Regex expressions
  [/regex/g, () => "Option 6"],
  // User defined function
  [(p) => p.startsWith("n"), "Option 7"],
  // Custom matchers using z
  [z.string(), "Option 8"],
  [z.number(), "Option 9"],
  [z.bool(), "Option 10"],
  [z.bool(), "Option 10"],
  // Catch all default
  [DEFAULT, "Option 11"]
);
```
