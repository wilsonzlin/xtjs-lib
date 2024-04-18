export default (
  [incA1, incA2]: [number, number],
  [incB1, incB2]: [number, number]
) => {
  const al = Math.min(incA1, incA2);
  const au = Math.max(incA1, incA2);
  const bl = Math.min(incB1, incB2);
  const bu = Math.max(incB1, incB2);

  const il = Math.max(al, bl);
  const iu = Math.min(au, bu);
  if (il <= iu) {
    return [il, iu] as const;
  }
  return undefined;
};
