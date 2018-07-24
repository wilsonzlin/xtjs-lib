import * as normstat from "normstat";

export type StatsFields = keyof normstat.IStats;

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
  [P in F]: normstat.IStats[P];
}

export function filterStats<F extends StatsFields> (stats: normstat.IStats, fields: ReadonlyArray<F>): PartialStats<F> {
  let partial = Object.create(null);
  for (let field of fields) {
    partial[field] = stats[field];
  }
  return partial;
}
