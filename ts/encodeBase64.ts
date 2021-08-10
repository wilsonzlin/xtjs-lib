import uint8ArrayToBuffer from "./uint8ArrayToBuffer";

const encodeBase64 =
  typeof Buffer == "function"
    ? (data: Uint8Array) => uint8ArrayToBuffer(data).toString("base64")
    : (data: Uint8Array) => btoa(String.fromCharCode(...data));

export default encodeBase64;
