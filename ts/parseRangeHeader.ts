import mapExists from "./mapExists";

export default (rangeHeaderValue: string) => {
  const rangeParts = /^bytes=(0|[1-9][0-9]*)-(0|[1-9][0-9]*)?$/.exec(
    rangeHeaderValue
  );
  if (!rangeParts) {
    return undefined;
  }
  const start = Number.parseInt(rangeParts[1], 10);
  const end = mapExists(rangeParts[2], (p) => Number.parseInt(p, 10));
  if (
    !Number.isSafeInteger(start) ||
    start < 0 ||
    (end != undefined && (!Number.isSafeInteger(end) || end < 0 || start > end))
  ) {
    return undefined;
  }
  return { start, end };
};
