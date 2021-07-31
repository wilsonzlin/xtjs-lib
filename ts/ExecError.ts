import defined from "./defined";
import mapDefined from "./mapDefined";

export default class ExecError extends Error {
  constructor(
    readonly cmd: string,
    readonly code: number | undefined,
    readonly signal: string | undefined
  ) {
    super(
      `Command ${cmd} exited with ${[
        mapDefined(code, (c) => `code ${c}`),
        mapDefined(signal, (s) => `signal ${s}`),
      ]
        .filter(defined)
        .join(" and ")}`
    );
  }
}
