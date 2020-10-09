import cryptoRandomInteger from './cryptoRandomInteger';
import shuffleArray from './shuffleArray';

export default <T> (array: T[]): T[] => shuffleArray(array, cryptoRandomInteger);
