import { ErrorMatch, errorMatches } from "./errorMatches";

// This function was automatically generated
export function nullify<T1, R>(realFn: (a: T1) => R, errorMatch?: ErrorMatch): (a: T1) => R | null {
  return function (a: T1): R | null {
    try {
      return realFn(a);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify2<T1, T2, R>(realFn: (a: T1, b: T2) => R, errorMatch?: ErrorMatch): (a: T1, b: T2) => R | null {
  return function (a: T1, b: T2): R | null {
    try {
      return realFn(a, b);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify3<T1, T2, T3, R>(realFn: (a: T1, b: T2, c: T3) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3) => R | null {
  return function (a: T1, b: T2, c: T3): R | null {
    try {
      return realFn(a, b, c);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify4<T1, T2, T3, T4, R>(realFn: (a: T1, b: T2, c: T3, d: T4) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4): R | null {
    try {
      return realFn(a, b, c, d);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify5<T1, T2, T3, T4, T5, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5): R | null {
    try {
      return realFn(a, b, c, d, e);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify6<T1, T2, T3, T4, T5, T6, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6): R | null {
    try {
      return realFn(a, b, c, d, e, f);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify7<T1, T2, T3, T4, T5, T6, T7, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7): R | null {
    try {
      return realFn(a, b, c, d, e, f, g);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify8<T1, T2, T3, T4, T5, T6, T7, T8, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify9<T1, T2, T3, T4, T5, T6, T7, T8, T9, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify10<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify11<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify12<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify13<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify14<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify15<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify16<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify17<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify18<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify19<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify20<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify21<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify22<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify23<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify24<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23, x: T24) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23, x: T24) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23, x: T24): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}

// This function was automatically generated
export function nullify25<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19, T20, T21, T22, T23, T24, T25, R>(realFn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23, x: T24, y: T25) => R, errorMatch?: ErrorMatch): (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23, x: T24, y: T25) => R | null {
  return function (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6, g: T7, h: T8, i: T9, j: T10, k: T11, l: T12, m: T13, n: T14, o: T15, p: T16, q: T17, r: T18, s: T19, t: T20, u: T21, v: T22, w: T23, x: T24, y: T25): R | null {
    try {
      return realFn(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y);
    } catch (error) {
      if (errorMatches(error, errorMatch)) {
        return null;
      }
      throw error;
    }
  }
}