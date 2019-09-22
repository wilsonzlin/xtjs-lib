import * as Path from "path";
import {getDirEntsStats} from "../util/getDirEntsStats";
import {IJoggerOptions} from "./JoggerOptions";
import {filterStats, PartialStats, STATS_FIELDS, StatsFields} from "../util/filterStats";

export type JoggerTree<F extends StatsFields> = {
  [ent: string]: PartialStats<F> | JoggerTree<F> | null;
}

export const jogTree = async <F extends StatsFields> (
  {
    dir,
    depth = Number.POSITIVE_INFINITY,
    fields = STATS_FIELDS
  }: IJoggerOptions<F>
): Promise<JoggerTree<F>> => {
  const tree: JoggerTree<F> = Object.create(null);
  const subdirNames: string[] = [];

  const ents = await getDirEntsStats(dir);
  for (const {name, stats} of ents) {
    // Check .directory before filtering
    if (!stats.directory) {
      tree[name] = filterStats(stats, fields);
    } else {
      if (depth <= 1) {
        tree[name] = null;
      } else {
        subdirNames.push(name);
      }
    }
  }

  const subdirTrees = await Promise.all(subdirNames.map(d => jogTree<F>({dir: Path.join(dir, d), depth: depth - 1})));
  subdirNames.forEach((name, i) => {
    tree[name] = subdirTrees[i];
  });
  return tree;
};
