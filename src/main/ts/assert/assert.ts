import {mapDefined} from '../optional/map';

export class AssertionError extends Error {
}

export class UnreachableError extends AssertionError {
  constructor (val?: never, msg?: string) {
    super(msg ?? mapDefined(val, String));
  }
}

export const assertState = (chk: boolean, msg: string = 'Unexpected state'): void => {
  if (!chk) {
    throw new AssertionError(msg);
  }
};
