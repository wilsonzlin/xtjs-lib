export type PipelineComponent<I, O> = {
  costBuffer: number;
  concurrency: number;
  handler: (i: I) => Promise<O | undefined>; // Returning undefined bails out of the pipeline early.
  inputCost: (i: I) => number;
};

export default class Pipeline<LastOutput = unknown> {
  private readonly components = Array<PipelineComponent<any, any>>();

  private constructor(private readonly producer: () => Promise<any>) {}

  static from<O>(producer: () => Promise<O>): Pipeline<O> {
    return new Pipeline(producer);
  }

  then<O>(component: PipelineComponent<LastOutput, O>): Pipeline<O> {
    this.components.push(component);
    return this as any;
  }

  async finally(final: (o: LastOutput) => void) {
    const state = this.components.map(() => ({
      buffer: Array<any>(),
      costUsage: 0,
      driving: 0,
    }));
    const isFull = (idx: number) =>
      state[idx].costUsage >= this.components[idx].costBuffer;
    const push = (idx: number, val: any) => {
      state[idx].buffer.push(val);
      state[idx].costUsage += this.components[idx].inputCost(val);
      ensureDrivingComponent(idx);
    };
    const ensureDrivingComponent = async (idx: number) => {
      const isFirst = idx === 0;
      const isLast = idx === state.length - 1;
      if (state[idx].driving >= this.components[idx].concurrency) {
        return;
      }
      state[idx].driving++;
      while ((isLast || !isFull(idx + 1)) && state[idx].buffer.length) {
        const input = state[idx].buffer.shift()!;
        state[idx].costUsage -= this.components[idx].inputCost(input);
        // If shifting has now made this component's buffer not full, drive the previous component.
        // NOTE: Shifting may not always make it non-full.
        if (!isFull(idx)) {
          if (isFirst) {
            ensureDrivingProducer();
          } else {
            ensureDrivingComponent(idx - 1);
          }
        }
        const output = await this.components[idx].handler(input);
        if (output !== undefined) {
          if (isLast) {
            final(output);
          } else {
            push(idx + 1, output);
          }
        }
      }
      state[idx].driving--;
    };
    let drivingProducer = false;
    const ensureDrivingProducer = async () => {
      if (drivingProducer) {
        return;
      }
      drivingProducer = true;
      while (!isFull(0)) {
        const output = await this.producer();
        push(0, output);
      }
      drivingProducer = false;
    };
    ensureDrivingProducer();
  }
}
