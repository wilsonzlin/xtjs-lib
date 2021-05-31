import { expect } from "chai";
import "mocha";
import cryptoRandomInteger from "./cryptoRandomInteger";

describe("cryptoRandomInteger", () => {
  it("should generate values in the range inclusively", () => {
    for (let i = 0; i < 1e5; i++) {
      expect(cryptoRandomInteger(-2, 4)).at.least(-2).at.most(4);
    }
  }).timeout(60000);

  it("should be reasonably random", () => {
    const min = -2;
    const max = 4;
    const amount = 1e6;

    const threshold = 1000;

    const slots: { [slot: number]: number } = Object.create(null);

    for (let slot = min; slot <= max; slot++) {
      slots[slot] = 0;
    }

    for (let i = 0; i < amount; i++) {
      const rnd = cryptoRandomInteger(min, max);
      if (!Number.isSafeInteger(rnd) || rnd < min || rnd > max) {
        throw new RangeError(`RNG generated out-of-range value: ${rnd}`);
      }
      slots[rnd]++;
    }

    let minCount = +Infinity;
    let minCountSlot;
    let maxCount = -Infinity;
    let maxCountSlot;

    for (let slot = min; slot <= max; slot++) {
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
