import mapDefined from "./mapDefined";
import maybe from "./maybe";

export default <C extends { length: number } | { size: number }, R>(
  collection: C,
  mapper: (collection: C) => R
) =>
  mapDefined(
    maybe(
      collection,
      (collection: any) =>
        ("size" in collection ? collection.size : collection.length) === 0
    ),
    mapper
  );
