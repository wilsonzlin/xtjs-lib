import * as fs from 'fs';
import {join} from 'path';

export default (path: string) => fs.promises.readdir(path)
  .then(files => Promise.all(files.map(async (f) => ({
    name: f,
    path: join(path, f),
    stats: await fs.promises.stat(join(path, f)),
  }))));
