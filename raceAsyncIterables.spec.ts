import { expect } from "chai";
import "mocha";
import arrayFromAsyncIterable from "./arrayFromAsyncIterable";
import asyncTimeout from "./asyncTimeout";
import raceAsyncIterables from "./raceAsyncIterables";

describe("raceAsyncIterables", () => {
  it("should yield elements from async iterables as soon as they are ready", async () => {
    const expected = Array<number>();
    const pushAndWait = async (last: number, delta: number) => {
      await asyncTimeout(delta);
      const newValue = last + delta;
      expected.push(newValue);
      return newValue;
    };
    const out = await arrayFromAsyncIterable(
      raceAsyncIterables(
        (async function* () {
          let x = 0;
          yield (x = await pushAndWait(x, 100));
          yield (x = await pushAndWait(x, 100));
          yield (x = await pushAndWait(x, 50));
        })(),
        (async function* () {
          let x = 0;
          yield (x = await pushAndWait(x, 0));
          yield (x = await pushAndWait(x, 150));
          yield (x = await pushAndWait(x, 50));
          yield (x = await pushAndWait(x, 150));
          await asyncTimeout(500);
        })(),
        (async function* () {
          let x = 0;
          yield (x = await pushAndWait(x, 50));
          yield (x = await pushAndWait(x, 200));
          yield (x = await pushAndWait(x, 300));
        })(),
        (async function* () {
          let x = 0;
          yield (x = await pushAndWait(x, 350));
        })()
      )
    );
    expect(out).to.deep.equal(expected);
  }).timeout(60000);
});
