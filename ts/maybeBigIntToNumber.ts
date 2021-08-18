const MIN_INT = BigInt(Number.MIN_SAFE_INTEGER);
const MAX_INT = BigInt(Number.MAX_SAFE_INTEGER);

export default (val: bigint) =>
  val < MIN_INT || val > MAX_INT ? undefined : Number(val);
