import repeatedGenerator from "./repeatedGenerator";

export default <V>(it: Iterator<V>, consumers: number): Iterator<V>[] => {
  const buffers: IteratorResult<V>[][] = [];
  const fill = () => {
    const res = it.next();
    for (const buffer of buffers) {
      buffer.push(res);
    }
  };
  return [
    ...repeatedGenerator(
      consumers,
      (): Iterator<V> => {
        const buffer: IteratorResult<V>[] = [];
        buffers.push(buffer);
        return {
          next() {
            const bufRes = buffer.shift();
            if (bufRes) {
              return bufRes;
            }
            fill();
            return buffer.shift()!;
          },
        };
      }
    ),
  ];
};
