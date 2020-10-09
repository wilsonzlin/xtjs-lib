export default <V> (val: V | undefined): val is V => val !== undefined;
