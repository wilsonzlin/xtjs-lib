import deleteUndefined from "./deleteUndefined";

type WithoutUndefined<T extends {}> = {
  [prop in keyof T]: T[prop] extends undefined ? never : T[prop];
};

export default <T extends {}>(obj: T): WithoutUndefined<T> => {
  const without = { ...obj };
  deleteUndefined(without);
  return without as any;
};
