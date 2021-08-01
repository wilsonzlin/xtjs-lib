const encodeBase64 =
  typeof Buffer == "function"
    ? (data: Uint8Array) =>
        Buffer.from(data.buffer, data.byteOffset, data.byteLength).toString(
          "base64"
        )
    : (data: Uint8Array) => btoa(String.fromCharCode(...data));
