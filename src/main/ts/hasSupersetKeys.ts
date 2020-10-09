import isSuperset from './isSuperset';

export default (sup: object, full: object) => isSuperset(Object.keys(sup), Object.keys(full));
