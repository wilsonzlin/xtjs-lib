import mapDefined from "./mapDefined";
import filterValue from "./filterValue";

export default <C extends { length: number } | { size: number }, R>(
  collection: C,
  mapper: (collection: C) => R
) =>
  mapDefined(
    filterValue(
      collection,
      (collection: any) =>
        ("size" in collection ? collection.size : collection.length) > 0
    ),
    mapper
  );
