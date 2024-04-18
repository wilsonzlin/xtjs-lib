import deleteObjectKeys from "./deleteObjectKeys";

export default (obj: any) =>
  deleteObjectKeys(
    obj,
    ...Object.keys(obj).filter((k) => obj[k] === undefined)
  );
