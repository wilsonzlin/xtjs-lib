import cryptoRandomPortionInclusive from "./cryptoRandomPortionInclusive";

export default (min: number, max: number) =>
  cryptoRandomPortionInclusive() * (max - min) + min;
