import errorWrapped from "./errorWrapped";

export default errorWrapped(BigInt, SyntaxError) as (
  raw: string
) => bigint | undefined;
