import {StatsFields} from "fs/stats/filterStats";

export interface IJoggerOptions<F extends StatsFields> {
  dir: string;
  depth?: number;
  fields?: ReadonlyArray<F>;
}
