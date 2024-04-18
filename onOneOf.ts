type EventHandlers = {
  [eventName: string]: (arg: any) => any;
};

type EventEmitter<T extends EventHandlers> = {
  [E in keyof T]:
    | {
        on(eventName: E, cb: T[E]): void;
        off(eventName: string, cb: Function): void;
      }
    | {
        addEventListener(eventName: E, cb: T[E]): void;
        removeEventListener(eventName: string, cb: Function): void;
      };
}[keyof T];

type Builder<Outputs extends any[]> = {
  add<T extends EventHandlers>(
    eventEmitter: EventEmitter<T>,
    handlers: T
  ): Builder<
    {
      [E in keyof T]: ReturnType<T[E]>;
    }[keyof T]
  >;
  wait(): Promise<Outputs[number]>;
};

// This is like `select!` in other languages. We can't use Promise.race since it doesn't clean up the loser promises (promises don't have cancel/cleanup functionality).
// WARNING: This doesn't check if it's possible for the events to even emit anymore. Check the state of the event emitters before calling this function. Alternatively, use a timeout.
// Tip: to set a timeout, provide an AbortSignal.timeout() as one of the emitters.
export default () => {
  const emitters = Array<{
    emitter: EventEmitter<any>;
    handlers: EventHandlers;
  }>();
  const builder: Builder<[]> = {
    add(emitter, handlers) {
      emitters.push({ emitter, handlers });
      return builder as any;
    },
    wait() {
      return new Promise((resolve, reject) => {
        const cleanUps = Array<() => void>();
        for (const { emitter, handlers } of emitters) {
          for (const [eventName, cb] of Object.entries(handlers)) {
            const handler = (arg: any) => {
              for (const fn of cleanUps) {
                fn();
              }
              try {
                resolve(cb(arg));
              } catch (err) {
                reject(err);
              }
            };
            cleanUps.push(() => {
              if ("removeEventListener" in emitter) {
                emitter.removeEventListener(eventName, handler);
              } else {
                emitter.off(eventName, handler);
              }
            });
            if ("addEventListener" in emitter) {
              emitter.addEventListener(eventName, handler as any);
            } else {
              emitter.on(eventName, handler as any);
            }
          }
        }
      });
    },
  };
  return builder;
};
