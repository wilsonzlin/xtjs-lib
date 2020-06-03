export const exists = <V> (val: V | null | undefined): val is V => val != undefined;

export const defined = <V> (val: V | undefined): val is V => val !== undefined;
