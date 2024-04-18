import decodeUrlEncoded from "./decodeUrlEncoded";
import splitString from "./splitString";

export default (raw: string): { [name: string]: string | true } =>
  Object.fromEntries(
    splitString(raw.replace(/^\?/, ""), "&").map((comp) => {
      const [n, v = true] = comp.split("=", 2).map(decodeUrlEncoded);
      return [n, v];
    })
  );
