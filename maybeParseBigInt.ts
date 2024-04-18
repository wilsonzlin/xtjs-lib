import errorWrapped from "./errorWrapped";

export default errorWrapped(BigInt) as (
  raw: string | number
) => bigint | undefined;
