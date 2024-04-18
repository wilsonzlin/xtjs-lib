import { readdirSync } from "fs";
import { join } from "path";

export default function* recursiveReaddirSync(
  dir: string,
  filter?: (f: {
    file: string;
    path: string;
    isDirectory: () => boolean;
    isFile: () => boolean;
  }) => boolean,
  prefix: string = ""
): Generator<string, void, void> {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, ent.name);
    if (
      !filter ||
      filter({
        file: ent.name,
        isDirectory: () => ent.isDirectory(),
        isFile: () => ent.isFile(),
        path,
      })
    ) {
      if (ent.isDirectory()) {
        yield* recursiveReaddirSync(path, filter, prefix + ent.name + "/");
      } else {
        yield join(prefix + ent.name);
      }
    }
  }
}
