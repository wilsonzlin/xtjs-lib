// Don't use Readable as some libraries use NodeJS.ReadableStream which lacks some properties of Readable.
// Also, the user may not be in a Node.js environment. Don't use DOM ReadableStream for same reason.
export type IsomorphicReadableStream<C> =
  | {
      on(event: "data", listener: (chunk: C) => void): void;
      on(event: "error", listener: (err: Error) => void): void;
      on(event: "end", listener: () => void): void;
      [Symbol.asyncIterator](): AsyncIterator<C>;
    }
  | {
      getReader(): {
        read(): Promise<
          | {
              done: true;
              value?: C;
            }
          | {
              done: false;
              value: C;
            }
        >;
      };
    };

export default <C>(stream: IsomorphicReadableStream<C>): AsyncIterable<C> => {
  if ("getReader" in stream) {
    const reader = stream.getReader();
    return {
      [Symbol.asyncIterator]() {
        return {
          async next() {
            return (await reader.read()) as IteratorResult<C>;
          },
        };
      },
    };
  } else {
    return stream;
  }
};
