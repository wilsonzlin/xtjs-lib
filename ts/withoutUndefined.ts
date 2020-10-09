import deleteUndefined from "./deleteUndefined";

export default (obj: object) => {
  const without = { ...obj };
  deleteUndefined(without);
  return without;
};
