import { expect } from "chai";
import polygonArea from "./polygonArea";

describe("polygonArea", () => {
  it("should calculate the area of a rectangle that doesn't end at start", () => {
    expect(
      polygonArea([
        [5, 5],
        [8, 5],
        [8, 7],
        [5, 7],
      ])
    ).to.equal(6);
  });
  it("should calculate the area of a rectangle that ends at start", () => {
    expect(
      polygonArea([
        [5, 5],
        [8, 5],
        [8, 7],
        [5, 7],
        [5, 5],
      ])
    ).to.equal(6);
  });
  it("should calculate the area of a triangle that doesn't end at start", () => {
    expect(
      polygonArea([
        [0, 0],
        [4, 0],
        [0, 4],
      ])
    ).to.equal(8);
  });
  it("should calculate the area of a triangle that ends at start", () => {
    expect(
      polygonArea([
        [0, 0],
        [4, 0],
        [0, 4],
        [0, 0],
      ])
    ).to.equal(8);
  });
});
