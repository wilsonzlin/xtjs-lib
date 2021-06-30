import { Readable } from "stream";

export default (val: unknown): val is Readable =>
  typeof val == "object" &&
  !!val &&
  "read" in val &&
  typeof val["read"] == "function";
