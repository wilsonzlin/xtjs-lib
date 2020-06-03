import {range as rangeGenerator} from 'generator/range';

export const range = (from: number, to?: number, step?: number) => {
  return Array.from(rangeGenerator(from, to, step));
};

export type ArrayElementProducer<T> = (index: number, array: T[]) => T;

export const blk = <T> (of: number, producer: ArrayElementProducer<T>): T[] => {
  return Array.from({length: of}, ((_, i: number, a: T[]) => producer(i, a)) as any);
};

export type SequentialArrayElementProducer<T> = (prev: T, index: number, array: T[]) => T;

export const seq = <T> (of: number, producer: SequentialArrayElementProducer<T>, first: T): T[] => {
  return Array(of).fill(null).map((_, i, a) => producer(i == 0 ? first : a[i - 1], i, a));
};
