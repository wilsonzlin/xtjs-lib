import { BigIntStats, Stats } from "fs";
import { lstat, stat } from "fs/promises";

export default async <Bigint extends boolean = false>(
  path: string,
  opts?: {
    bigint?: Bigint;
    lstat?: boolean;
  }
): Promise<undefined | (Bigint extends true ? BigIntStats : Stats)> => {
  try {
    const stats = await (opts?.lstat ? lstat : stat)(path, {
      bigint: opts?.bigint,
    });
    return stats as any;
  } catch (e) {
    if (e.code === "ENOENT") {
      return undefined;
    }
    throw e;
  }
};
