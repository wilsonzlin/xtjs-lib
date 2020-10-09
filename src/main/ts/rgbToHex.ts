const toHexComponent = (component: number): string => component.toString(16).padStart(6, '0');

export default (r: number, g: number, b: number) => {
  return `#${toHexComponent(r)}${toHexComponent(g)}${toHexComponent(b)}`;
};
