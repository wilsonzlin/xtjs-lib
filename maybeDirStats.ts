import filterValue from "./filterValue";
import maybeStats from "./maybeStats";

export default async <Bigint extends boolean = false>(
  path: string,
  opts?: {
    bigint?: Bigint;
    lstat?: boolean;
  }
) => filterValue(await maybeStats<Bigint>(path, opts), (s) => s?.isDirectory());
