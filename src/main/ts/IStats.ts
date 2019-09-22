import * as fs from "fs";

export interface IStats {
  directory: boolean;
  file: boolean;
  blockDevice: boolean;
  characterDevice: boolean;
  FIFO: boolean;
  socket: boolean;
  symbolicLink: boolean;

  container: number;
  inode: number;
  links: number;

  user: number;
  group: number;
  device: number;

  size: number;
  blockSize: number;
  blocks: number;

  accessed: number;
  modified: number;
  changed: number;
  created: number;
}

export function convertFromFS(stats: fs.Stats): IStats {
  let normStats = Object.create(null);

  normStats.directory = stats.isDirectory();
  normStats.file = stats.isFile();
  normStats.blockDevice = stats.isBlockDevice();
  normStats.characterDevice = stats.isCharacterDevice();
  normStats.FIFO = stats.isFIFO();
  normStats.socket = stats.isSocket();
  normStats.symbolicLink = stats.isSymbolicLink();

  normStats.container = stats.dev;
  normStats.inode = stats.ino;
  normStats.links = stats.nlink;

  normStats.user = stats.uid;
  normStats.group = stats.gid;
  normStats.device = stats.rdev;

  normStats.size = stats.size;
  normStats.blockSize = stats.blksize;
  normStats.blocks = stats.blocks;

  normStats.accessed = stats.atimeMs;
  normStats.modified = stats.mtimeMs;
  normStats.changed = stats.ctimeMs;
  normStats.created = stats.birthtimeMs;

  return normStats;
}
