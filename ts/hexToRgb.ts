import slices from "./slices";

const HexString = new RegExp("^#([0-9a-f]{3}|[0-9a-f]{6})$", "i");

export default (str: string) => {
  const match = HexString.exec(str);
  if (!match) {
    throw new SyntaxError("Invalid hex color string");
  }
  const hex = match[1];
  const short = hex.length == 3;
  const parts = slices(hex, short ? 1 : 2);
  return parts.map((d) => {
    let digit = Number.parseInt(d, 16);
    if (short) {
      digit += digit * 16;
    }
    return digit;
  }) as [number, number, number];
};
