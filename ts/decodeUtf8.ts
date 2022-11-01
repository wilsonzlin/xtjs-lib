const utf8Decoder = new TextDecoder();

export default (raw: Uint8Array | ArrayBuffer) => utf8Decoder.decode(raw);
