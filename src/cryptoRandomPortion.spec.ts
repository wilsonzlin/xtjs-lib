import { expect } from "chai";
import "mocha";
import cryptoRandomPortion from "./cryptoRandomPortion";

describe("cryptoRandomPortion", () => {
  it("should generate values in the range [0, 1)", () => {
    for (let i = 0; i < 1e5; i++) {
      expect(cryptoRandomPortion()).at.least(0).lessThan(1);
    }
  });

  it("should be reasonably random", () => {
    const slotsCount = 20;
    const amount = 1e5;

    const threshold = Math.round((amount / slotsCount) * 0.1);

    const slots: { [slot: number]: number } = Object.create(null);

    for (let slot = 0; slot < slotsCount; slot++) {
      slots[slot] = 0;
    }

    for (let i = 0; i < amount; i++) {
      slots[Math.floor(cryptoRandomPortion() * slotsCount)]++;
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
  });
});
