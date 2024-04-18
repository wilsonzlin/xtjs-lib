export default <V>(...values: V[]) => {
  const set = new Set(values);
  return (value: V) => set.has(value);
};
