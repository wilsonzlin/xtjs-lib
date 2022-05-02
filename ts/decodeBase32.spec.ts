import { expect } from "chai";
import "mocha";
import decodeBase32 from "./decodeBase32";
import encodeUtf8 from "./encodeUtf8";

describe("decodeBase32", () => {
  it("should decode correctly", () => {
    for (const [bytes, encoded] of [
      [[], ""],
      [[0], "AA======"],
      [[0, 0], "AAAA===="],
      [[3, 14, 15], "AMHA6==="],
      [[11, 13, 15, 17], "BMGQ6EI="],
      [[255, 255, 255, 255, 255], "77777777"],
      [[39, 0, 4, 28, 66], "E4AAIHCC"],
      [[...encodeUtf8("TOTP")], "KRHVIUA="],
      [[0xde, 0xad, 0xbe, 0xef, 0xca, 0xfe], "32W3536K7Y======"],
      [[1, 1, 1, 1, 1], "AEAQCAIB"],
    ] as const) {
      expect([...decodeBase32(encoded)]).to.deep.equal(bytes);
    }
  });
});
