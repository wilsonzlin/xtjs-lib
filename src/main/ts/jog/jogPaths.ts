import {splitPathIntoComponents} from "../util/splitPathIntoComponents";
import {IJoggerOptions} from "./JoggerOptions";
import {jogList} from "./jogList";

export type JoggerPaths = string[][];

export function jogPaths ({dir, depth = Number.POSITIVE_INFINITY}: IJoggerOptions<any>): Promise<JoggerPaths> {
  return jogList({dir, depth})
    .then(list => {
      return list.map(splitPathIntoComponents);
    });
}
