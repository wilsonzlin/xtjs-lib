import Dict from "./Dict";
import StructuralMap, { Key } from "./StructuralMap";

export default <K extends Key, V>() => {
  return new Dict<K, V>(new StructuralMap<K, V>());
};
