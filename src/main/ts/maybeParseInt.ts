import maybe from "./maybe";

export default (raw: string, base: number = 10): number | undefined =>
  maybe(Number.parseInt(raw, base), (parsed) => Number.isSafeInteger(parsed));
