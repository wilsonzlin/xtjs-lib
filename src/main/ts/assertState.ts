import AssertionError from "./AssertionError";

export default (chk: boolean, msg: string = "Unexpected state"): void => {
  if (!chk) {
    throw new AssertionError(msg);
  }
};
