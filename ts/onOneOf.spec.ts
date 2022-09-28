import chai, { expect } from "chai";
import EventEmitter from "events";
import { PassThrough } from "stream";
import onOneOf from "./onOneOf";
import chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

describe("onOneOf", () => {
  it("resolves with the correct value", async () => {
    const emitter = new EventEmitter();
    const prom = onOneOf()
      .add(emitter, {
        a: () => "a",
        b: () => "b",
        c: () => "c",
      })
      .wait();
    emitter.emit("b");
    emitter.emit("a");
    await expect(prom).to.eventually.equal("b");
  });

  it("resolves with the correct value given multiple emitters", async () => {
    const emitter1 = new EventEmitter();
    const emitter2 = new EventEmitter();
    const prom = onOneOf()
      .add(emitter1, {
        a: () => "a",
        b: () => "b",
        c: () => "c",
      })
      .add(emitter2, {
        a: () => "d",
        b: () => "e",
        c: () => "f",
      })
      .wait();
    emitter2.emit("b");
    emitter1.emit("b");
    await expect(prom).to.eventually.equal("e");
  });

  it("supports AbortSignal", async () => {
    const emitter = new EventEmitter();
    // TODO Use AbortSignal.timeout() once available.
    const abort = new AbortController();
    setTimeout(() => abort.abort(), 500);

    const prom = onOneOf()
      .add(emitter, {
        a: () => "a",
      })
      .add(abort.signal, {
        abort: () => "aborted",
      })
      .wait();
    setTimeout(() => emitter.emit("a"), 750);
    await expect(prom).to.eventually.equal("aborted");
  });

  describe("when used with Node.js streams", () => {
    it("resolves with the chunk on 'data'", async () => {
      const stream = new PassThrough();
      const prom = onOneOf()
        .add(stream, {
          data: (chunk) => chunk,
          end: () => "ended",
          error: (err) => {
            throw err;
          },
        })
        .wait();
      stream.end(Buffer.from([1, 5, 3]));
      expect(await prom).to.deep.equal(Buffer.from([1, 5, 3]));
    });

    it("resolves with the error if we return the argument on 'error'", async () => {
      const stream = new PassThrough();
      const prom = onOneOf()
        .add(stream, {
          data: (chunk) => chunk,
          end: () => "ended",
          error: (err) => err,
        })
        .wait();
      class MyError extends Error {}
      stream.destroy(new MyError("Hello"));
      expect(await prom).to.be.an.instanceOf(MyError);
    });

    it("rejects with the error if we throw the argument on 'error'", async () => {
      const stream = new PassThrough();
      const prom = onOneOf()
        .add(stream, {
          data: (chunk) => chunk,
          end: () => "ended",
          error: (err) => {
            throw err;
          },
        })
        .wait();
      class MyError extends Error {}
      stream.destroy(new MyError("Hello"));
      await expect(prom).to.eventually.be.rejectedWith(MyError);
    });

    it("resolves with the value we return on 'ended'", async () => {
      const stream = new PassThrough();
      const prom = onOneOf()
        .add(stream, {
          data: (chunk) => chunk,
          end: () => "ended",
          error: (err) => {
            throw err;
          },
        })
        .wait();
      stream.end();
      expect(await prom).to.equal("ended");
    });

    it("resolves with the data then with 'ended'", async () => {
      const stream = new PassThrough({
        encoding: "utf8",
      });
      for (let i = 1; i <= 2; i++) {
        if (i == 1) {
          stream.write("data");
        } else {
          stream.end();
        }
        const res = await onOneOf()
          .add(stream, {
            data: (chunk) => chunk,
            end: () => "ended",
            error: (err) => {
              throw err;
            },
          })
          .wait();
        expect(res).to.equal(i == 1 ? "data" : "ended");
      }
    });
  });
});
