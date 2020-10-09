import ErrorMatch from './ErrorMatch';
import errorMatches from './errorMatches';

export default <R, F extends (...args: any[]) => Promise<R>> (realFn: F, errorMatch?: ErrorMatch): F & ((...args: any[]) => Promise<R | undefined>) => {
  return async function (this: any, ...args: any[]) {
    try {
      return await realFn.apply(this, args);
    } catch (error) {
      if (!errorMatch || errorMatches(error, errorMatch)) {
        return undefined;
      }
      throw error;
    }
  } as any;
};
