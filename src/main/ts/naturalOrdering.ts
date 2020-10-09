import nativeOrdering from './nativeOrdering';

type NumberPart = {
  value: number;
  leadingZeros: number;
}

type StringPart = {
  value: string;
}

type Part = NumberPart | StringPart;

const isNumberPart = (p: Part): p is NumberPart => 'leadingZeros' in p;

const digitRegExp = /^\d$/u;

const lexNumber = (s: string, i: number): string => {
  let raw = '';

  while (i < s.length && digitRegExp.test(s[i])) {
    raw += s[i];
    i++;
  }

  return raw;
};

const tokenise = (s: string): Part[] => {
  const parts: Part[] = [];

  let i = 0;
  while (i < s.length) {
    const c = s[i];

    if (digitRegExp.test(c)) {
      const rawNumber = lexNumber(s, i);

      const leadingZeros = /^0*/.exec(rawNumber)![0].length;
      const value = Number.parseInt(rawNumber, 10);

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
};

export default (a: string, b: string) => {
  const tokensA = tokenise(a);
  const tokensB = tokenise(b);
  const maxLen = Math.max(tokensA.length, tokensB.length);

  for (let i = 0; i < maxLen; i++) {
    const unitA = tokensA[i];
    const unitB = tokensB[i];

    if (unitA == undefined) {
      return -1;
    }
    if (unitB == undefined) {
      return 1;
    }

    const aIsNum = isNumberPart(unitA);
    const bIsNum = isNumberPart(unitB);

    if (aIsNum != bIsNum) {
      // One is a number
      return aIsNum ? -1 : 1;
    }

    const nat_cmp = nativeOrdering(unitA.value, unitB.value);
    if (nat_cmp) {
      return nat_cmp;
    }

    if (aIsNum) {
      // Both are numbers
      // NOTE: The one with more leading zeros is before
      const zerosCmp = nativeOrdering((unitA as NumberPart).leadingZeros, (unitB as NumberPart).leadingZeros);
      if (zerosCmp) {
        return zerosCmp * -1;
      }
    }
  }

  return 0;
}
