import assertNonNegative from "./assertNonNegative";

export default () => {
  let pending = 0;
  let allDoneListeners = new Set<() => void>();
  let errorListeners = new Set<(err: Error) => void>();
  return {
    on: (ev: "alldone" | "error", l: () => void) => {
      switch (ev) {
        case "alldone":
          allDoneListeners.add(l);
          break;
        case "error":
          errorListeners.add(l);
          break;
        default:
          throw new TypeError(`Unknown event: ${ev}`);
      }
    },
    off: (ev: "alldone" | "error", l: () => void) => {
      switch (ev) {
        case "alldone":
          allDoneListeners.delete(l);
          break;
        case "error":
          errorListeners.delete(l);
          break;
        default:
          throw new TypeError(`Unknown event: ${ev}`);
      }
    },
    done: () => {
      if (!assertNonNegative(--pending)) {
        allDoneListeners.forEach((l) => l());
      }
    },
    add: (count: number = 1) => (pending += count),
    error: (err: Error) => errorListeners.forEach((l) => l(err)),
  };
};
