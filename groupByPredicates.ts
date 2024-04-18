export default <
  T,
  Preds extends {
    [prop: string]: (val: T) => boolean;
  }
>(
  vals: Iterable<T>,
  preds: Preds
): {
  [prop in keyof Preds]: T[];
} => {
  const predPairs = Object.entries(preds);
  const out = Object.fromEntries(
    predPairs.map(([prop]) => [prop, Array<T>()] as const)
  );
  for (const val of vals) {
    for (const [prop, pred] of predPairs) {
      if (pred(val)) {
        out[prop].push(val);
      }
    }
  }
  return out as any;
};
