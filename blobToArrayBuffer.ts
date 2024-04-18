import assertType from "./assertType";
import isArrayBuffer from "./isArrayBuffer";

export default (blob: File | Blob): Promise<ArrayBuffer> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(blob);
    reader.addEventListener("error", () => reject(reader.error));
    reader.addEventListener("load", () =>
      resolve(assertType(reader.result, isArrayBuffer))
    );
  });
