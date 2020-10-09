import ErrorMatch from './ErrorMatch';
import errorMatches from './errorMatches';

export default <R, F extends (...args: any[]) => R> (realFn: F, errorMatch?: ErrorMatch): F & ((...args: any[]) => R | undefined) => {
  return function (this: any, ...args: any[]) {
    try {
      return realFn.apply(this, args);
    } catch (error) {
      if (!errorMatch || errorMatches(error, errorMatch)) {
        return undefined;
      }
      throw error;
    }
  } as any;
};
