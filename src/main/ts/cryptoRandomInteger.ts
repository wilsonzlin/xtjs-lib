import cryptoRandomPortion from 'cryptoRandomPortion';

export default (min: number, max: number) => Math.floor(cryptoRandomPortion() * (max - min + 1)) + min;
