import AssertionError from "./AssertionError";
import Comparator from "./Comparator";
import nativeOrdering from "./nativeOrdering";
import type from "./type";

export class ResultUnwrapError extends Error {}

// `E` should never be false-like.
// Patterns:
// const [err, res] = resultable();
// const {error, result} = resultable();
// try { resultable().unwrap() } catch (err) { ... }
export default class Result<T, E> {
  private constructor(private readonly pair: [true, T] | [false, E]) {}

  static Ok<T, E>(result: T) {
    return new Result<T, E>([true, result]);
  }

  static Err<T, E>(error: E) {
    return new Result<T, E>([false, error]);
  }

  get result(): T | undefined {
    return this.pair[0] ? this.pair[1] : undefined;
  }

  get error(): E | undefined {
    return this.pair[0] ? undefined : this.pair[1];
  }

  readonly and = <U>(other: Result<U, E>): Result<U, E> => {
    return this.pair[0] ? other : Result.Err(this.pair[1]);
  };

  readonly andThen = <U>(other: (val: T) => Result<U, E>): Result<U, E> => {
    return this.pair[0] ? other(this.pair[1]) : Result.Err(this.pair[1]);
  };

  readonly contains = (
    other: T,
    comparator: Comparator<T> = nativeOrdering as any
  ) => {
    return this.pair[0] && comparator(this.pair[1], other) === 0;
  };

  readonly containsErr = (
    other: E,
    comparator: Comparator<E> = nativeOrdering as any
  ) => {
    return !this.pair[0] && comparator(this.pair[1], other) === 0;
  };

  readonly expect = (msg: string): T => {
    if (!this.pair[0]) {
      throw new AssertionError(msg);
    }
    return this.pair[1];
  };

  readonly expectErr = (msg: string): E => {
    if (this.pair[0]) {
      throw new AssertionError(msg);
    }
    return this.pair[1];
  };

  readonly flatten = (): T extends Result<infer U, infer F>
    ? Result<U, F>
    : Result<T, E> => {
    if (this.pair[0] && type(this.pair[1]) == Result) {
      return this.pair[1] as any;
    }
    return this as any;
  };

  readonly inspect = (fn: (val: T) => unknown): Result<T, E> => {
    if (this.pair[0]) {
      fn(this.pair[1]);
    }
    return this;
  };

  readonly inspectErr = (fn: (val: E) => unknown): Result<T, E> => {
    if (!this.pair[0]) {
      fn(this.pair[1]);
    }
    return this;
  };

  readonly isErr = () => {
    return !this.pair[0];
  };

  readonly isErrAnd = (pred: (err: E) => any) => {
    return !this.pair[0] && pred(this.pair[1]);
  };

  readonly map = <U>(op: (val: T) => U): Result<U, E> => {
    return !this.pair[0]
      ? Result.Err(this.pair[1])
      : Result.Ok(op(this.pair[1]));
  };

  readonly mapErr = <F>(op: (val: E) => F): Result<T, F> => {
    return this.pair[0]
      ? Result.Ok(this.pair[1])
      : Result.Err(op(this.pair[1]));
  };

  readonly mapOr = <U>(def: U, op: (val: T) => U): U => {
    return !this.pair[0] ? def : op(this.pair[1]);
  };

  readonly mapOrElse = <U>(def: (val: E) => U, op: (val: T) => U): U => {
    return !this.pair[0] ? def(this.pair[1]) : op(this.pair[1]);
  };

  readonly or = <F>(other: Result<T, F>): Result<T, F> => {
    return !this.pair[0] ? other : Result.Ok(this.pair[1]);
  };

  readonly orElse = <F>(other: (err: E) => Result<T, F>): Result<T, F> => {
    return !this.pair[0] ? other(this.pair[1]) : Result.Ok(this.pair[1]);
  };

  readonly unwrap = (): T => {
    if (!this.pair[0]) {
      throw this.pair[1];
    }
    return this.pair[1];
  };

  readonly unwrapErr = (): E => {
    if (this.pair[0]) {
      throw new ResultUnwrapError("Called unwrapErr on Ok");
    }
    return this.pair[1];
  };

  readonly unwrapOr = (def: T): T => {
    return !this.pair[0] ? def : this.pair[1];
  };

  readonly unwrapOrElse = (def: (err: E) => T): T => {
    return !this.pair[0] ? def(this.pair[1]) : this.pair[1];
  };

  *[Symbol.iterator]() {
    if (this.pair[0]) {
      yield undefined;
      yield this.pair[1];
    } else {
      yield this.pair[1];
      yield undefined;
    }
  }
}

export const Ok = <T, E>(val: T) => Result.Ok<T, E>(val);

export const Err = <T, E>(err: E) => Result.Err<T, E>(err);
