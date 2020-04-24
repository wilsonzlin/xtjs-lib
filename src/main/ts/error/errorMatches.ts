export type ErrorMatch = string | number | Function;

export function errorMatches (error: any, errorMatch: ErrorMatch | undefined): boolean {
  if (errorMatch === undefined) {
    return true;
  }

  const matchIsPrimitive = typeof errorMatch == 'string' || typeof errorMatch == 'number';

  const errorIsObject = !!error && typeof error == 'object';

  if (errorIsObject && matchIsPrimitive) {
    return error.code === errorMatch;
  }

  if (errorIsObject && typeof errorMatch == 'function') {
    return error instanceof errorMatch;
  }

  return error === errorMatch;
}
