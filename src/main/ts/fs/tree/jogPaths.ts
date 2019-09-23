import {splitPathIntoComponents} from "fs/path/splitPathIntoComponents";
import {IJoggerOptions} from "fs/tree/JoggerOptions";
import {jogList} from "fs/tree/jogList";

export type JoggerPaths = string[][];

export const jogPaths = async ({dir, depth = Number.POSITIVE_INFINITY}: IJoggerOptions<any>): Promise<JoggerPaths> => {
  return (await jogList({dir, depth})).map(splitPathIntoComponents);
};
