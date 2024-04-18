export default function* (from: number, to?: number, step?: number) {
  if (to === undefined) {
    to = from;
    from = 0;
  }
  if (step === undefined) {
    step = 1;
  }

  for (
    let current = from;
    step < 0 ? current > to : current < to;
    current += step
  ) {
    yield current;
  }
}
