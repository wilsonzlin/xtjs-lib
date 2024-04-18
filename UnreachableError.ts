import AssertionError from "./AssertionError";
import mapDefined from "./mapDefined";

export default class UnreachableError extends AssertionError {
  constructor(val?: any, msg?: string) {
    super(msg ?? mapDefined(val, String));
  }
}
