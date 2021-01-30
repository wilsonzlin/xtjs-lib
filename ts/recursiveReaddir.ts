import { join } from "path";
import { readdir } from "fs/promises";

export default async function* recursiveReaddir(
  dir: string,
  filter?: RegExp,
  prefix: string = ""
): AsyncGenerator<string, void, void> {
  for (const ent of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, ent.name);
    if (!filter || filter.test(path)) {
      if (ent.isDirectory()) {
        yield* recursiveReaddir(path, filter, prefix + ent.name + "/");
      } else {
        yield join(prefix + ent.name);
      }
    }
  }
}
