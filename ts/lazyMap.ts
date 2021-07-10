export default <V, R>(areSame: (a: V, b: V) => boolean = (a, b) => a === b) => {
  let set = false;
  let value: V;
  let cached: R;
  return {
    map(v: V, computeIfChanged: (value: V) => R) {
      if (!set || !areSame(value, v)) {
        set = true;
        return (cached = computeIfChanged((value = v)));
      }
      return cached;
    },
  };
};
