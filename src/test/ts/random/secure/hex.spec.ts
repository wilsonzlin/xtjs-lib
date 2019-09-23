import {expect} from "chai";
import "mocha";
import {cryptoRandomHex} from "random/secure/hex";

const HEXSTR_REGEX = /^[0-9a-f]+$/;

describe("cryptoRandomHex", () => {
  it("should generate hexadecimal strings with 8 bytes of entropy if no argument is provided", () => {
    for (let i = 0; i < 1e5; i++) {
      let str = cryptoRandomHex();
      expect(str.length).to.equal(8 * 2);
      expect(str).to.match(HEXSTR_REGEX);
    }
  });

  it("should generate hexadecimal strings with entropy bytes equal to provided argument", () => {
    for (let i = 0; i < 1e5; i++) {
      // Use Math.ceil to prevent zero
      let length = Math.ceil(Math.random() * 16384);
      let str = cryptoRandomHex(length);
      expect(str.length).to.equal(length * 2);
      expect(str).to.match(HEXSTR_REGEX);
    }
  }).timeout(60000);

  it("should generate an empty string when provided argument is less than or equal to zero", () => {
    for (let i = 0; i < 1e5; i++) {
      let length = -Math.floor(Math.random() * 1024);
      let str = cryptoRandomHex(length);
      expect(str).to.equal("");
    }
  });
});
