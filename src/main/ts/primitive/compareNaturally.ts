import { compareNatively } from "./compareNatively";

type Part = NumberPart | StringPart;

interface NumberPart {
  value: number;
  leadingZeros: number;
}

interface StringPart {
  value: string;
}

function isNumberPart (p: Part): p is NumberPart {
  return "leadingZeros" in p;
}

const digitRegExp = /^\d$/u;

function lexNumber (s: string, i: number): string {
  let raw = "";

  while (i < s.length && digitRegExp.test(s[i])) {
    raw += s[i];
    i++;
  }

  return raw;
}

function tokenise (s: string): Array<Part> {
  let parts: Array<Part> = [];

  let i = 0;
  while (i < s.length) {
    let c = s[i];

    if (digitRegExp.test(c)) {
      let rawNumber = lexNumber(s, i);

      let leadingZeros = /^0*/.exec(rawNumber)![0].length;
      let value = Number.parseInt(rawNumber, 10);

      parts.push({
        value: value,
        leadingZeros: leadingZeros,
      } as NumberPart);
      i += rawNumber.length;

    } else {
      parts.push({
        value: c,
      } as StringPart);
    }

    i++;
  }

  return parts;
}

export function compareNaturally (a: string, b: string): number {
  let tokens_a = tokenise(a);
  let tokens_b = tokenise(b);
  let max_len = Math.max(tokens_a.length, tokens_b.length);

  for (let i = 0; i < max_len; i++) {
    let unit_a = tokens_a[i];
    let unit_b = tokens_b[i];

    if (unit_a == undefined) {
      return -1;
    }
    if (unit_b == undefined) {
      return 1;
    }

    let a_is_num = isNumberPart(unit_a);
    let b_is_num = isNumberPart(unit_b);

    if (a_is_num != b_is_num) {
      // One is a number
      return a_is_num ? -1 : 1;
    }

    let nat_cmp = compareNatively(unit_a.value, unit_b.value);
    if (nat_cmp) {
      return nat_cmp;
    }

    if (a_is_num) {
      // Both are numbers
      // NOTE: The one with more leading zeros is before
      let zeros_cmp = compareNatively((unit_a as NumberPart).leadingZeros, (unit_b as NumberPart).leadingZeros);
      if (zeros_cmp) {
        return zeros_cmp * -1;
      }
    }
  }

  return 0;
}
