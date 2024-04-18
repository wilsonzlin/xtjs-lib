const utf8Encoder = new TextEncoder();

export default (str: string) => utf8Encoder.encode(str);
