import maybeFileStats from "./maybeFileStats";

export default async (path: string) =>
  !!(await maybeFileStats(path))?.isDirectory();
