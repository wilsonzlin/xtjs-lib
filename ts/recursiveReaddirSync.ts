import { readdirSync } from "fs";
import { join } from "path";

export default function* recursiveReaddirSync(
  dir: string,
  filter?: RegExp,
  prefix: string = ""
): Generator<string, void, void> {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, ent.name);
    if (!filter || filter.test(path)) {
      if (ent.isDirectory()) {
        yield* recursiveReaddirSync(path, filter, prefix + ent.name + "/");
      } else {
        yield join(prefix + ent.name);
      }
    }
  }
}
