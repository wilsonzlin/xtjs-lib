import { expect } from "chai";
import { createHash } from "crypto";
import "mocha";
import StructuralMap from "./StructuralMap";

class Id {
  constructor(
    readonly cluster: {
      id: bigint;
      region: string;
    },
    readonly alias: string,
    readonly domain: string
  ) {}

  equals(other: unknown) {
    return (
      other instanceof Id &&
      this.cluster.id === other.cluster.id &&
      this.cluster.region === other.cluster.region &&
      this.alias === other.alias &&
      this.domain === other.domain
    );
  }

  hashCode() {
    // NOTE: This is just a quick and dirty function for testing, and should not be how an actual hashCode is implemented.
    return createHash("md5")
      .update([this.alias, this.domain].map(String).join(""))
      .digest("base64");
  }
}

describe("StructuralMap", () => {
  it("should use equals() and hashCode() for determining key", () => {
    const map = new StructuralMap();
    expect(map.size).to.equal(0);
    const id1 = new Id({ id: 3n, region: "us" }, "u1", "gmail.com");
    expect(map.get(id1)).to.equal(undefined);
    map.set(id1, 1);
    expect(map.get(id1)).to.equal(1);
    const id2 = new Id({ id: 3n, region: "us" }, "u1", "gmail.com");
    expect(map.get(id2)).to.equal(1);
    const id3 = new Id({ id: 8n, region: "eu" }, "u1", "gmail.com");
    expect(map.get(id3)).to.equal(undefined);
    map.set(id3, 3);
    expect(map.get(id1)).to.equal(1);
    expect(map.get(id2)).to.equal(1);
    expect(map.get(id3)).to.equal(3);
    expect(map.delete(id2)).to.be.true;
    expect(map.size).to.equal(1);
    expect(map.get(id1)).to.equal(undefined);
    expect(map.get(id2)).to.equal(undefined);
    expect(map.get(id3)).to.equal(3);
  });
});
