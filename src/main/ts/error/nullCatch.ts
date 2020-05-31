import {ErrorMatch, errorMatches} from "error/errorMatches";

export const nullCatch = (realFn: Function, errorMatch?: ErrorMatch): Function => {
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
};

export const asyncNullCatch = (realFn: Function, errorMatch?: ErrorMatch): Function => {
  return async function (this: any) {
    try {
      return await realFn.apply(this, arguments);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  };
};
