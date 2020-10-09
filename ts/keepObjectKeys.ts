import deleteObjectKeys from "./deleteObjectKeys";

export default (obj: object, ...keep: string[]) =>
  deleteObjectKeys(obj, ...Object.keys(obj).filter((k) => !keep.includes(k)));
