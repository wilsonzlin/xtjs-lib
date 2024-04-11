import { cpus } from "os";
import { isMainThread, MessagePort, parentPort, Worker } from "worker_threads";
import assertExists from "./assertExists";
import Dict from "./Dict";
import UnreachableError from "./UnreachableError";

class TaskIO {
  private readonly sentRequests = new Dict<
    number,
    {
      resolve: (output: any) => void;
    }
  >();
  private nextSendRequestId = 0;

  constructor(
    private readonly taskHandlers: Record<
      string,
      (input: any, ctx: any) => Promise<any>
    >
  ) {}

  handleMessage(ctx: any, port: Worker | MessagePort, msg: any) {
    if (msg.$type === "response") {
      const { id, output } = msg;
      const { resolve } = this.sentRequests.remove(id)!;
      resolve(output);
    } else if (msg.$type === "request") {
      const { id, type, input } = msg;
      const handler = this.taskHandlers[type];
      // TODO Handle errors.
      handler(input, ctx).then((output: any) => {
        port.postMessage({
          $type: "response",
          id,
          output,
        });
      });
    } else {
      throw new UnreachableError();
    }
  }

  sendRequest(to: MessagePort | Worker, type: string, input: any) {
    return new Promise((resolve) => {
      const id = this.nextSendRequestId++;
      this.sentRequests.set(id, { resolve });
      to.postMessage({ $type: "request", id, type, input });
    });
  }
}

type Tasks = {
  [name: string]: {
    input: any;
    output: any;
  };
};

type Ctx<AllTasks extends Tasks, State> = {
  state: State;
  execute: <T extends keyof AllTasks & string>(
    t: T,
    i: AllTasks[T]["input"]
  ) => Promise<AllTasks[T]["output"]>;
};

export default class WorkerPool<
  // Make sure these defaults are set, or else they implicitly default to `any` and some type errors will be masked.
  LeaderTasks extends Tasks = {},
  WorkerTasks extends Tasks = {},
  LeaderState = void,
  WorkerState = void
> {
  private stateInit?: Function;
  private entrypoint?: (ctx: Ctx<any, any>) => Promise<unknown>;
  private taskHandlers: Record<
    string,
    (input: any, ctx: Ctx<any, any>) => Promise<any>
  > = {};

  constructor(
    private readonly scriptPath: string,
    private readonly n = cpus().length
  ) {}

  leader(fn: (ctx: Ctx<WorkerTasks, LeaderState>) => Promise<unknown>) {
    if (isMainThread) {
      this.entrypoint = fn;
    }
    return this;
  }

  worker(fn: (ctx: Ctx<LeaderTasks, WorkerState>) => Promise<unknown>) {
    if (!isMainThread) {
      this.entrypoint = fn;
    }
    return this;
  }

  leaderState<S>(
    fn: () => Promise<S>
  ): WorkerPool<LeaderTasks, WorkerTasks, S, WorkerState> {
    if (isMainThread) {
      this.stateInit = fn;
    }
    return this as any;
  }

  workerState<S>(
    fn: () => Promise<S>
  ): WorkerPool<LeaderTasks, WorkerTasks, LeaderState, S> {
    if (!isMainThread) {
      this.stateInit = fn;
    }
    return this as any;
  }

  leaderTask<T extends string, I, O>(
    name: T,
    handler: (i: I, ctx: Ctx<WorkerTasks, LeaderState>) => Promise<O>
  ): WorkerPool<
    LeaderTasks & { [name in T]: { input: I; output: O } },
    WorkerTasks,
    LeaderState,
    WorkerState
  > {
    if (isMainThread) {
      this.taskHandlers[name] = handler;
    }
    return this as any;
  }

  workerTask<T extends string, I, O>(
    name: T,
    handler: (i: I, ctx: Ctx<LeaderTasks, WorkerState>) => Promise<O>
  ): WorkerPool<
    LeaderTasks,
    WorkerTasks & { [name in T]: { input: I; output: O } },
    LeaderState,
    WorkerState
  > {
    if (!isMainThread) {
      this.taskHandlers[name] = handler;
    }
    return this as any;
  }

  async go() {
    const state = await this.stateInit?.();
    const io = new TaskIO(this.taskHandlers);
    if (isMainThread) {
      // We're inside the leader.
      const workers = Array.from(
        { length: this.n },
        () => new Worker(this.scriptPath)
      );
      // TODO Handle `w.on("error")`.
      for (const w of workers) {
        w.addListener("message", (msg) => io.handleMessage(ctx, w, msg));
      }
      let nextWorkerId = 0;
      const ctx: Ctx<any, any> = {
        state,
        execute: (type, input) => {
          const worker =
            workers[(nextWorkerId = (nextWorkerId + 1) % workers.length)];
          return io.sendRequest(worker, type, input);
        },
      };
      this.entrypoint?.(ctx);
    } else {
      // We're inside a worker.
      const leader = assertExists(parentPort);
      leader.addListener("message", (msg) =>
        io.handleMessage(ctx, leader, msg)
      );
      const ctx: Ctx<any, any> = {
        state,
        execute: (type, input) => io.sendRequest(leader, type, input),
      };
      // Does not have to exist.
      this.entrypoint?.(ctx);
    }
  }
}
