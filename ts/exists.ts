export default <V>(val: V | null | undefined): val is V => val != undefined;
