import perceivedBrightness from './perceivedBrightness';

export default (r: number, g: number, b: number): boolean => perceivedBrightness(r, g, b) > 0.5;
