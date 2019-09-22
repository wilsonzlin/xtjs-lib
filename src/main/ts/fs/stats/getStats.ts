import * as fs from "fs";
import { IStats, convertFromFS } from "./IStats";

export interface IGetStatsOptions {
  path: string;
  resolve?: boolean;
}

export function getStats({ path, resolve: resolveSymlinks = false }: IGetStatsOptions): Promise<IStats> {
  return new Promise((resolve, reject) => {
    fs[resolveSymlinks ? "stat" : "lstat"](path, (err, stats) => {
      if (err) {
        return reject(err);
      }

      let normStats = convertFromFS(stats);

      resolve(normStats);
    });
  });
}

export function getStatsSync({ path, resolve: resolveSymlinks = false }: IGetStatsOptions): IStats {
  let stats = fs[resolveSymlinks ? "statSync" : "lstatSync"](path);

  let normStats = convertFromFS(stats);

  return normStats;
}
