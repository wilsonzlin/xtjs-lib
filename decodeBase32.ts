import { BASE32_ALPHABET_DEFAULT } from "./base32";

export default (enc: string, alphabet = BASE32_ALPHABET_DEFAULT) => {
  /*

  Byte ┌───0───┐┌───1────┐┌───2───┐┌───3────┐┌───4───┐
  Char 11111 11100 00000 01111 11110 00000 00111 11111
  Char ||||| |||__ _____ _|||| ||||_ _____ __||| |||||
  Char   0     1     2     3     4     5     6     7

  */
  enc = /^(.*?)=*$/.exec(enc)![1];
  const A = Object.fromEntries(alphabet.map((c, i) => [c, i]));
  const out = [];
  for (let i = 0; i < enc.length; i += 8) {
    out.push((A[enc[i]] << 3) | (A[enc[i + 1]] >>> 2));
    if (i + 2 < enc.length) {
      out.push(
        (A[enc[i + 1]] << 6) | (A[enc[i + 2]] << 1) | (A[enc[i + 3]] >>> 4)
      );
    }
    if (i + 4 < enc.length) {
      out.push((A[enc[i + 3]] << 4) | (A[enc[i + 4]] >>> 1));
    }
    if (i + 5 < enc.length) {
      out.push(
        (A[enc[i + 4]] << 7) | (A[enc[i + 5]] << 2) | (A[enc[i + 6]] >>> 3)
      );
    }
    if (i + 7 < enc.length) {
      out.push((A[enc[i + 6]] << 5) | A[enc[i + 7]]);
    }
  }
  return new Uint8Array(out);
};
