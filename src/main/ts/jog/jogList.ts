import {IJoggerOptions} from "./JoggerOptions";
import {jogTable} from "./jogTable";

export type JoggerList = string[];

export function jogList ({dir, depth = Number.POSITIVE_INFINITY}: IJoggerOptions<any>): Promise<JoggerList> {
  return jogTable({dir, depth})
    .then(table => {
      // Sort for deterministic results
      return Object.keys(table).sort();
    });
}
