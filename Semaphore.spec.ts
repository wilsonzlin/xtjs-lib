import { expect } from "chai";
import "mocha";
import asyncTimeout from "./asyncTimeout";
import Semaphore from "./Semaphore";

describe("Semaphore", () => {
  it("should call producers concurrently under max limit", async () => {
    const queue = new Semaphore(3);
    let x = 0;
    queue.add(() => asyncTimeout(1000).then(() => x++));
    queue.add(() => asyncTimeout(1000).then(() => x++));
    queue.add(() => asyncTimeout(1000).then(() => x++));
    queue.add(() => asyncTimeout(1000).then(() => x++));
    queue.add(() => asyncTimeout(1000).then(() => x++));
    queue.add(() => asyncTimeout(1000).then(() => x++));
    expect(x).to.equal(0);
    await asyncTimeout(1200);
    expect(x).to.equal(3);
    await asyncTimeout(1000);
    expect(x).to.equal(6);
  }).timeout(10000);

  it("should resolve Promise when task is dequeued and fulfilled", async () => {
    const DUMMY = {};
    const queue = new Semaphore(3);
    let x = 0;
    const prom = queue.add(() => asyncTimeout(1000).then(() => x++));
    expect(x).to.equal(0);
    expect(await Promise.race([prom, DUMMY])).to.equal(DUMMY);
    await asyncTimeout(600);
    expect(x).to.equal(0);
    expect(await Promise.race([prom, DUMMY])).to.equal(DUMMY);
    await asyncTimeout(450);
    expect(x).to.equal(1);
    expect(await Promise.race([prom, DUMMY])).to.equal(0);
  }).timeout(10000);
});
