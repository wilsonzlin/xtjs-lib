import { expect } from "chai";
import "mocha";
import cryptoRandomPortion from "./cryptoRandomPortion";

describe("cryptoRandomPortion", () => {
  it("should generate values in the range [0, 1)", () => {
    for (let i = 0; i < 1e5; i++) {
      expect(cryptoRandomPortion()).at.least(0).lessThan(1);
    }
  }).timeout(60000);

  it("should be reasonably random", () => {
    const slotsCount = 20;
    const amount = 1e6;

    const threshold = 1000;

    const slots = Array(slotsCount).fill(0);

    for (let i = 0; i < amount; i++) {
      const rnd = cryptoRandomPortion();
      if (rnd < 0 || rnd >= 1 || !Number.isFinite(rnd)) {
        throw new RangeError(`RNG generated value outside range: ${rnd}`);
      }
      slots[Math.floor(rnd * slotsCount)]++;
    }

    let minCount = +Infinity;
    let minCountSlot;
    let maxCount = -Infinity;
    let maxCountSlot;

    for (const slot in slots) {
      const count = slots[slot];

      if (count < minCount) {
        minCount = count;
        minCountSlot = slot;
      }

      if (count > maxCount) {
        maxCount = count;
        maxCountSlot = slot;
      }
    }

    expect(Math.abs(maxCount - minCount)).lessThan(threshold);
  }).timeout(60000);
});
