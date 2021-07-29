export type TokenisedForNaturalOrdering = {
  // For a string segment, the tiebreaker is the original substring (i.e. without any removed characters and in original case).
  // For a number segment, the tiebreaker is the number of leading zeros.
  tokens: { segment: string | bigint; tiebreaker: string | bigint }[];
  string: string;
};

// Check tests for details on how this works.
export default (string: string): TokenisedForNaturalOrdering => {
  const tokens = [];
  let segment: bigint | string = "";
  let tiebreaker: bigint | string = "";
  for (const c of string) {
    if (/^[0-9]$/.test(c)) {
      // Is digit.
      if (typeof segment == "string") {
        if (segment) {
          tokens.push({ segment, tiebreaker });
        }
        segment = 0n;
        tiebreaker = 0n;
      }
      if (segment === 0n && c === "0") {
        (tiebreaker as bigint)++;
      } else {
        segment = segment * 10n + BigInt(c);
      }
    } else {
      if (typeof segment == "bigint") {
        tokens.push({ segment, tiebreaker });
        segment = "";
        tiebreaker = "";
      }
      tiebreaker += c;
      if (/^[a-zA-Z]$/.test(c)) {
        // Is letter.
        segment += c.toLowerCase();
      }
    }
  }
  if (segment !== "") {
    tokens.push({ segment, tiebreaker });
  }
  return { tokens, string };
};
