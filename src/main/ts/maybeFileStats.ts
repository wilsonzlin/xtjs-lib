import fs from "fs";
import asyncErrorWrapped from './asyncErrorWrapped';

export default asyncErrorWrapped(fs.promises.stat, 'ENOENT');
