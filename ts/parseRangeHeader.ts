import mapExists from "./mapExists";

export default (rangeHeaderValue: string, fileSize: number) => {
  const rangeParts = /^bytes=(0|[1-9][0-9]*)-(0|[1-9][0-9]*)?$/.exec(
    rangeHeaderValue
  );
  if (!rangeParts) {
    return undefined;
  }
  const start = Number.parseInt(rangeParts[1], 10);
  const end =
    mapExists(rangeParts[2], (p) => Number.parseInt(p, 10)) ?? fileSize - 1;
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    start < 0 ||
    end < 0 ||
    start > end ||
    end >= fileSize
  ) {
    return undefined;
  }
  return { start, end };
};
