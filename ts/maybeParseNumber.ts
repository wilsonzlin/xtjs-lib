import filterValue from "./filterValue";

export default (raw: string) =>
  filterValue(Number.parseFloat(raw), (val) => Number.isFinite(val));
