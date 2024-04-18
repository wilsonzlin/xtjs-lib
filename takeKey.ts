import hasKey from "./hasKey";

export default <O extends object, P extends keyof O & string>(
  obj: O,
  prop: P
): O[P] | undefined => {
  if (hasKey(obj, prop)) {
    const value = obj[prop];
    delete obj[prop];
    return value;
  }
  return undefined;
};
