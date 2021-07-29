import arrayComparator from "./arrayComparator";
import derivedComparator from "./derivedComparator";
import last from "./last";
import multiComparator from "./multiComparator";
import nativeOrdering from "./nativeOrdering";
import propertyComparator from "./propertyComparator";
import { TokenisedForNaturalOrdering } from "./tokeniseForNaturalOrdering";

export default (vals: TokenisedForNaturalOrdering[]) =>
  vals
    .sort(
      propertyComparator(
        "tokens",
        multiComparator(
          arrayComparator((a, b) => {
            if (typeof a.segment == "bigint") {
              if (typeof b.segment == "bigint") {
                return nativeOrdering(a.segment, b.segment);
              }
              return -1;
            } else {
              if (typeof b.segment == "string") {
                return nativeOrdering(a.segment, b.segment);
              }
              return 1;
            }
          }),
          derivedComparator(last, (a, b) => {
            if (typeof a.tiebreaker == "bigint") {
              if (typeof b.tiebreaker == "bigint") {
                return nativeOrdering(b.tiebreaker, a.tiebreaker);
              }
              return -1;
            } else {
              if (typeof b.tiebreaker == "string") {
                return nativeOrdering(a.tiebreaker, b.tiebreaker);
              }
              return 1;
            }
          })
        )
      )
    )
    .map((v) => v.string);
