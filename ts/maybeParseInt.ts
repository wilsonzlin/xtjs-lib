import filterValue from "./filterValue";

export default (raw: string, base: number = 10): number | undefined =>
  filterValue(Number.parseInt(raw, base), (parsed) =>
    Number.isSafeInteger(parsed)
  );
