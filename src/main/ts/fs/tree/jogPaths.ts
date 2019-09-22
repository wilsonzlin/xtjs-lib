import {splitPathIntoComponents} from "../path/splitPathIntoComponents";
import {IJoggerOptions} from "./JoggerOptions";
import {jogList} from "./jogList";

export type JoggerPaths = string[][];

export const jogPaths = async ({dir, depth = Number.POSITIVE_INFINITY}: IJoggerOptions<any>): Promise<JoggerPaths> => {
  return (await jogList({dir, depth})).map(splitPathIntoComponents);
};
