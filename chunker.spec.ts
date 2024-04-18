import { expect } from "chai";
import "mocha";
import Chunker from "./chunker";

const b = (...b: number[]) => new Uint8Array(b);

describe("chunker", () => {
  it("should yield fixed-length Uint8Array instances", () => {
    const chunker = new Chunker(3);
    expect([...chunker.push(b(0, 1))]).to.deep.equal([]);
    expect([...chunker.push(b(0, 1, 2))]).to.deep.equal([b(0, 1, 0)]);
    expect([...chunker.push(b())]).to.deep.equal([]);
    expect([...chunker.push(b(0, 1, 2, 3, 4))]).to.deep.equal([
      b(1, 2, 0),
      b(1, 2, 3),
    ]);
    expect([...chunker.push(b(0, 1))]).to.deep.equal([b(4, 0, 1)]);
    expect([...chunker.push(b())]).to.deep.equal([]);
    expect([...chunker.push(b(0, 1))]).to.deep.equal([]);
    expect([...chunker.push(b(0, 1, 2, 3, 4, 5, 6, 7, 8, 9))]).to.deep.equal([
      b(0, 1, 0),
      b(1, 2, 3),
      b(4, 5, 6),
      b(7, 8, 9),
    ]);
    expect([...chunker.push(b(0, 1, 2, 3, 4))]).to.deep.equal([b(0, 1, 2)]);
    expect([...chunker.push(b(0, 1))]).to.deep.equal([b(3, 4, 0)]);
    expect(chunker.takeRemaining()).to.deep.equal(b(1));
  });
});
