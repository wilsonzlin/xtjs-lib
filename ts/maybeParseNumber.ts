import filterValue from "./filterValue";

// TODO This is too lax, as parseFloat accepts trailing junk (e.g. `100 eggs`).
export default (raw: string) =>
  filterValue(Number.parseFloat(raw), (val) => Number.isFinite(val));
