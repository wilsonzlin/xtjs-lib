import {IStats} from "fs/stats/IStats";

export type StatsFields = keyof IStats;

export const STATS_FIELDS: ReadonlyArray<any> = [
  "directory",
  "file",
  "blockDevice",
  "characterDevice",
  "FIFO",
  "socket",
  "symbolicLink",

  "container",
  "inode",
  "links",

  "user",
  "group",
  "device",

  "size",
  "blockSize",
  "blocks",

  "accessed",
  "modified",
  "changed",
  "created",
];

Object.freeze(STATS_FIELDS);

export type PartialStats<F extends StatsFields> = {
  [P in F]: IStats[P];
}

export const filterStats = <F extends StatsFields> (stats: IStats, fields: ReadonlyArray<F>): PartialStats<F> => {
  let partial = Object.create(null);
  for (let field of fields) {
    partial[field] = stats[field];
  }
  return partial;
};
