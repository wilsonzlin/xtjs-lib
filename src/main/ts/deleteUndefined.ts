import deleteObjectKeys from "./deleteObjectKeys";

export default (obj: object) =>
  deleteObjectKeys(
    obj,
    ...Object.keys(obj).filter((k) => obj[k] === undefined)
  );
