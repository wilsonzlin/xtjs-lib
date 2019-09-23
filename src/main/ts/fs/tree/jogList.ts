import {IJoggerOptions} from "fs/tree/JoggerOptions";
import {jogTable} from "fs/tree/jogTable";

export type JoggerList = string[];

export const jogList = async (
  {
    dir,
    depth = Number.POSITIVE_INFINITY
  }: IJoggerOptions<any>
): Promise<JoggerList> => {
  const table = await jogTable({dir, depth});
  // Sort for deterministic results
  return Object.keys(table).sort();
};
