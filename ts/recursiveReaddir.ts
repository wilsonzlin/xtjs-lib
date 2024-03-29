import { readdir } from "fs/promises";
import { join, sep } from "path";

const DEFAULT_IGNORED_ERRORS = ["EACCES", "ENOENT", "ENOTDIR"];

export default async function* recursiveReaddir(
  dir: string,
  filter?: (f: {
    file: string;
    path: string;
    isDirectory: () => boolean;
    isFile: () => boolean;
  }) => boolean,
  prefix: string = "",
  options?: {
    ignoredReaddirErrors?: string[];
  }
): AsyncGenerator<string, void, void> {
  let ents;
  try {
    ents = await readdir(dir, { withFileTypes: true });
  } catch (e) {
    if (
      (options?.ignoredReaddirErrors ?? DEFAULT_IGNORED_ERRORS).includes(e.code)
    ) {
      return;
    }
    throw e;
  }

  for (const ent of ents) {
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
        yield* recursiveReaddir(path, filter, prefix + ent.name + sep, options);
      } else {
        yield prefix + ent.name;
      }
    }
  }
}
