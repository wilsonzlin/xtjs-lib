const DEFAULT_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".split("");

export default (bytes: Uint8Array, alphabet = DEFAULT_ALPHABET) => {
  const A = alphabet;
  const out = [];
  const b = (i: number) => bytes[i] ?? 0;
  const p = (i: number) => (i < bytes.byteLength ? undefined : "=");
  for (let i = 0; i < bytes.byteLength; i += 5) {
    out.push(
      A[(b(i) & 0b11111_000) >>> 3],
      A[((b(i) & 0b00000_111) << 2) | ((b(i + 1) & 0b11_00000_0) >>> 6)],
      p(i + 1) ?? A[(b(i + 1) & 0b00_11111_0) >>> 1],
      p(i + 1) ??
        A[((b(i + 1) & 0b00_00000_1) << 4) | ((b(i + 2) & 0b1111_0000) >>> 4)],
      p(i + 2) ??
        A[((b(i + 2) & 0b0000_1111) << 1) | ((b(i + 3) & 0b1_00000_00) >>> 7)],
      p(i + 3) ?? A[(b(i + 3) & 0b0_11111_00) >>> 2],
      p(i + 3) ??
        A[((b(i + 3) & 0b0_00000_11) << 3) | ((b(i + 4) & 0b111_00000) >>> 5)],
      p(i + 4) ?? A[b(i + 4) & 0b000_11111]
    );
  }
  return out.join("");
};
