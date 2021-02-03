import { expect } from "chai";
import "mocha";
import bufferedSharedIterator from "./bufferedSharedIterator";

describe("bufferedSharedIterator", () => {
  it("should provide iterator values in correct order amongst consumers", () => {
    const producer = [0, 1, 2, 3, 4][Symbol.iterator]();
    const [c1, c2, c3] = bufferedSharedIterator(producer, 3);
    expect(c1.next()).to.deep.equal({ value: 0, done: false });
    expect(c1.next()).to.deep.equal({ value: 1, done: false });
    expect(c1.next()).to.deep.equal({ value: 2, done: false });
    expect(c2.next()).to.deep.equal({ value: 0, done: false });
    expect(c2.next()).to.deep.equal({ value: 1, done: false });
    expect(c3.next()).to.deep.equal({ value: 0, done: false });
    expect(c2.next()).to.deep.equal({ value: 2, done: false });
    expect(c2.next()).to.deep.equal({ value: 3, done: false });
    expect(c2.next()).to.deep.equal({ value: 4, done: false });
    expect(c1.next()).to.deep.equal({ value: 3, done: false });
    expect(c2.next()).to.deep.equal({ value: undefined, done: true });
    expect(c1.next()).to.deep.equal({ value: 4, done: false });
    expect(c1.next()).to.deep.equal({ value: undefined, done: true });
    expect(c3.next()).to.deep.equal({ value: 1, done: false });
    expect(c3.next()).to.deep.equal({ value: 2, done: false });
    expect(c3.next()).to.deep.equal({ value: 3, done: false });
    expect(c3.next()).to.deep.equal({ value: 4, done: false });
    expect(c3.next()).to.deep.equal({ value: undefined, done: true });
  });
});
