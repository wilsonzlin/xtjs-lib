import filterValue from "./filterValue";
import isEmpty from "./isEmpty";
import mapDefined from "./mapDefined";

export default <C extends { length: number } | { size: number }, R>(
  collection: C,
  mapper: (collection: C) => R
) => mapDefined(filterValue(collection, isEmpty), mapper);
