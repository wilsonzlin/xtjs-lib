import {ErrorMatch, errorMatches} from "error/errorMatches";

export function nullwrap (realFn: Function, errorMatch?: ErrorMatch): Function {
  return function (this: any) {
    try {
      return realFn.apply(this, arguments);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  };
}
