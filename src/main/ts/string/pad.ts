export const leftPad = (str: string, n: number, fill: string = " ") => {
  return fill.repeat(n - str.length) + str;
};

export const rightPad = (str: string, n: number, fill: string = " ") => {
  return str + fill.repeat(n - str.length);
};
