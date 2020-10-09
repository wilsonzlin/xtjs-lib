import ErrorMatch from './ErrorMatch';

export default (error: any, errorMatch: ErrorMatch) => {
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
};
