import {expect} from "chai";
import "mocha";
import {cryptoRandom01} from "../../../main/ts/random/01";

describe("cryptoRandom01", () => {
  it("should generate values in the range [0, 1)", () => {
    for (let i = 0; i < 1e5; i++) {
      expect(cryptoRandom01())
        .at.least(0)
        .lessThan(1);
    }
  });

  it("should be reasonably random", () => {
    let slotsCount = 20;
    let amount = 1e5;

    let threshold = Math.round((amount / slotsCount) * 0.1);

    let slots: { [slot: number]: number } = Object.create(null);

    for (let slot = 0; slot < slotsCount; slot++) {
      slots[slot] = 0;
    }

    for (let i = 0; i < amount; i++) {
      slots[Math.floor(cryptoRandom01() * slotsCount)]++;
    }

    let minCount = +Infinity;
    let minCountSlot;
    let maxCount = -Infinity;
    let maxCountSlot;

    for (let slot in slots) {
      let count = slots[slot];

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
  });
});
