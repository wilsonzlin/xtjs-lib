import Comparator from './Comparator';

export default <O, D> (derivation: (val: O) => D, derivedComparator: Comparator<D>): Comparator<O> => (a, b) => derivedComparator(derivation(a), derivation(b));
