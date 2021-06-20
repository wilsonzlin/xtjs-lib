const utf8Decoder = new TextDecoder();

export default (raw: Uint8Array) => utf8Decoder.decode(raw);
