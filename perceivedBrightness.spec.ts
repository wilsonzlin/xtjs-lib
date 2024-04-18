import { expect } from "chai";
import perceivedBrightness from "./perceivedBrightness";

describe("perceivedBrightness", () => {
  it("should return a value between 0 and 1 inclusive", () => {
    expect(perceivedBrightness(0, 0, 0)).to.equal(0);
    expect(perceivedBrightness(255, 255, 255)).to.equal(1);
  });

  it("should take into consideration the Helmholtz–Kohlrausch effect", () => {
    // These colours have the same value when converted to greyscale.
    expect(perceivedBrightness(248, 0, 0)).to.be.closeTo(0.68, 0.01);
    expect(perceivedBrightness(118, 131, 0)).to.be.closeTo(0.59, 0.01);
    expect(perceivedBrightness(0, 142, 92)).to.be.closeTo(0.61, 0.01);
    expect(perceivedBrightness(0, 130, 197)).to.be.closeTo(0.62, 0.01);
    expect(perceivedBrightness(212, 0, 234)).to.be.closeTo(0.76, 0.01);
  });
});
