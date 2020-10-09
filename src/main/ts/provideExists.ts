export default <V> (val: V | null | undefined, def: () => V) => val ?? def();
