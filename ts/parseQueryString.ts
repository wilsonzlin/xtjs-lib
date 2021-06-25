import decodeUrlEncoded from "./decodeUrlEncoded";
import splitString from "./splitString";

export default (raw: string): { [name: string]: string } =>
  Object.fromEntries(
    splitString(raw.replace(/^\?/, ""), "&").map((comp) =>
      comp.split("=", 2).map(decodeUrlEncoded)
    )
  );
