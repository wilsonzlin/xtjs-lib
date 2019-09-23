export const isIntegerLike = (val: any): boolean => {
  if (typeof val == "string") {
    if (!/^-?[0-9]+$/.test(val)) {
      return false;
    }
    val = Number.parseInt(val, 10);
  }

  if (typeof val != "number") {
    return false;
  }

  return Number.isFinite(val) && Math.floor(val) === val;
};
