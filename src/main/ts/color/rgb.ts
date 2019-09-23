import {segment} from "../string/segment";
import {leftPad} from "../string/pad";

export type RGBString = string;

const RGBComponentRawRegExp = "([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])";

export const RGBString = new RegExp(
  `^rgb\\(${RGBComponentRawRegExp},\s*${RGBComponentRawRegExp},\s*${RGBComponentRawRegExp}\\)$`);

const HexString = new RegExp("^#([0-9a-f]{3}|[0-9a-f]{6})$", "i");

export type RGBObject = {
  r: number;
  g: number;
  b: number;
}

export const isRGBObject = (obj: any): obj is RGBObject => {
  return obj && typeof obj == "object" &&
    obj.hasOwnProperty("r") &&
    obj.hasOwnProperty("g") &&
    obj.hasOwnProperty("b");
};

export type RGBObjectVerbose = {
  red: number;
  green: number;
  blue: number;
}

export const isRGBObjectVerbose = (obj: any): obj is RGBObjectVerbose => {
  return obj && typeof obj == "object" &&
    obj.hasOwnProperty("red") &&
    obj.hasOwnProperty("green") &&
    obj.hasOwnProperty("blue");
};

export type RGBObjectUppercase = {
  R: number;
  G: number;
  B: number;
}

export const isRGBObjectUppercase = (obj: any): obj is RGBObjectUppercase => {
  return obj && typeof obj == "object" &&
    obj.hasOwnProperty("R") &&
    obj.hasOwnProperty("G") &&
    obj.hasOwnProperty("B");
};

export type RGBArray = [number, number, number]

export type RGB = RGBObject | RGBObjectVerbose | RGBObjectUppercase | RGBArray;

export const normalize = (rgb: RGB): RGBArray => {
  if (isRGBObject(rgb)) {
    return [rgb.r, rgb.g, rgb.b];
  }
  if (isRGBObjectVerbose(rgb)) {
    return [rgb.red, rgb.green, rgb.blue];
  }
  if (isRGBObjectUppercase(rgb)) {
    return [rgb.R, rgb.B, rgb.B];
  }
  return rgb;
};

export const fromHex = (str: string): RGBArray => {
  const match = HexString.exec(str);
  if (!match) {
    throw new TypeError("Invalid hex color string");
  }
  const hex = match[1];
  const short = hex.length == 3;
  const parts = segment(hex, short ? 1 : 2);
  return parts.map(d => {
    let digit = Number.parseInt(d, 16);
    if (short) {
      digit += digit * 16;
    }
    return digit;
  }) as RGBArray;
};

const toHexComponent = (component: number): string => {
  return leftPad(component.toString(16), 0);
};

export const toHex = (rgb: RGB): string => {
  const [r, g, b] = normalize(rgb);
  return `#${toHexComponent(r)}${toHexComponent(g)}${toHexComponent(b)}`;
};
