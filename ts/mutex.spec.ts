import { expect } from "chai";
import asyncTimeout from "./asyncTimeout";
import mutex from "./mutex";

describe("mutex", () => {
  it("should block until unlocked", async () => {
    const mut = mutex();
    let c = 0;
    const asyncs = Promise.all([
      (async () => {
        const h = await mut.lock();
        c++;
        await asyncTimeout(1000);
        h.unlock();
      })(),
      (async () => {
        const h = await mut.lock();
        c++;
        await asyncTimeout(1000);
        h.unlock();
      })(),
      (async () => {
        const h = await mut.lock();
        c++;
        await asyncTimeout(1000);
        h.unlock();
      })(),
    ]);
    await (async () => {
      await asyncTimeout(500);
      expect(c).to.equal(1);
      await asyncTimeout(1000);
      expect(c).to.equal(2);
      await asyncTimeout(1000);
      expect(c).to.equal(3);
      await asyncTimeout(1000);
      expect(c).to.equal(3);
    })();
    await asyncs;
  }).timeout(10000);
});
