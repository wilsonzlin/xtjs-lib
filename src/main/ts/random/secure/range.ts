import {cryptoRandom} from "random/secure/random";

export const cryptoRandomInteger = (min: number, max: number) => {
  return Math.floor(cryptoRandom() * (max - min + 1)) + min;
};
