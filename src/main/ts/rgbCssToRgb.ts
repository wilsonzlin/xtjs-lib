const regexPart = '([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])';

const RGB_CSS = new RegExp(
  `^rgb\\(${regexPart},\s*${regexPart},\s*${regexPart}\\)$`,
);

export default (val: string) => {
  const matches = RGB_CSS.exec(val);
  if (!matches) {
    throw new SyntaxError('Invalid RGB CSS value');
  }
  return matches.slice(1).map(v => Number.parseInt(v, 10)) as [number, number, number];
}
