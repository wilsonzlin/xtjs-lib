import maybeDirStats from "./maybeDirStats";

export default async (path: string) => !!(await maybeDirStats(path));
