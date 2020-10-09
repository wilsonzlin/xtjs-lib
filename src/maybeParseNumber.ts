import maybe from "./maybe";

export default (raw: string) =>
  maybe(Number.parseFloat(raw), (val) => Number.isFinite(val));
