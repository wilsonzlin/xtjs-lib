export default <V>(provider: () => V) => {
  let set = false;
  let value: V;
  return {
    get() {
      if (!set) {
        set = true;
        value = provider();
      }
      return value;
    },
  };
};
