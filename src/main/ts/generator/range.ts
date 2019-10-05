export function* range(from: number, to?: number, step?: number): Generator<number> {
  if (to === undefined) {
    to = from;
    from = 0;
  }
  if (step === undefined) {
    step = 1;
  }

  let current = from;
  const ended = step < 0 ?
    (() => current < to!) :
    (() => current > to!);
  for (let current = from; !ended(); current += step) {
    yield current;
    current += step;
  }
}
