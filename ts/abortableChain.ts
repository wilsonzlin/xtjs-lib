// This is a simpler version of @xtjs/lang/ts/cancellable.ts without needing special syntax and code transformers while remaining type safe and ergonomic. It uses standard AbortController/AbortSignal and Promise APIs instead of custom types and functions.
// We use the term "chain" as "pipe" is overloaded.

type AbortableChainStageExecutor<I, O> = (
  lastStageOutput: I,
  signal: AbortSignal
) => O | Promise<O>;

type AbortableChainStage<I, ExecAddProps> = {
  add<O>(
    fn: AbortableChainStageExecutor<I, O>
  ): AbortableChainStage<Awaited<O>, ExecAddProps>;
  exec(): Promise<I> & ExecAddProps;
};

type ManagedAbortableChainStageExecAddProps = {
  abort: () => void;
};

export default class AbortableChain implements AbortableChainStage<void, {}> {
  private readonly stages = Array<AbortableChainStageExecutor<any, any>>();

  constructor(
    // For simplicity and consistency with other APIs that use AbortController/AbortSignal, the controller should be external and only the signal should be provided. Aborting is now done externally, which avoids us having to return a Promise-like + abort() object when calling exec().
    private readonly abortSignal: AbortSignal
  ) {}

  add<O>(
    fn: (lastStageOutput: any, signal: AbortSignal) => O | Promise<O>
  ): AbortableChainStage<Awaited<O>, {}> {
    this.stages.push(fn);
    return this as any;
  }

  async exec() {
    let out: any = undefined;
    for (const stage of this.stages) {
      this.abortSignal.throwIfAborted();
      out = await stage(out, this.abortSignal);
    }
    return out;
  }
}

export class ManagedAbortableChain extends AbortableChain {
  private readonly controller: AbortController;

  constructor() {
    const controller = new AbortController();
    super(controller.signal);
    this.controller = controller;
  }

  override add<O>(
    fn: (lastStageOutput: any, signal: AbortSignal) => O | Promise<O>
  ): AbortableChainStage<Awaited<O>, ManagedAbortableChainStageExecAddProps> {
    return super.add(fn) as any;
  }

  override async exec() {
    const promise = super.exec();
    // Don't return Promise as custom properties set on it like `abort` won't stick.
    const res: Promise<any> & ManagedAbortableChainStageExecAddProps = {
      [Symbol.toStringTag]: ManagedAbortableChain.name,
      then: (f, r) => promise.then(f, r),
      catch: (r) => promise.catch(r),
      finally: (n) => promise.finally(n),
      abort: () => this.controller.abort(),
    };
    return res;
  }
}
