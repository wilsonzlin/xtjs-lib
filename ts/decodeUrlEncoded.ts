export default (encoded: string) =>
  decodeURIComponent(encoded.replaceAll("+", " "));
