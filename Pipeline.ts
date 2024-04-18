import assertState from "./assertState";

export type PipelineComponent<I, O> = {
  costBuffer: number;
  concurrency: number;
  handler: (i: I) => Promise<O | undefined>; // Returning undefined bails out of the pipeline early.
  inputCost: (i: I) => number;
};

export default class Pipeline<LastOutput = unknown> {
  private readonly components = Array<PipelineComponent<any, any>>();

  private constructor(
    private readonly producer: () => Promise<any | undefined>
  ) {}

  // If the producer returns undefined, it marks the end of any more inputs.
  static from<O>(producer: () => Promise<O | undefined>): Pipeline<O> {
    return new Pipeline(producer);
  }

  then<O>(component: PipelineComponent<LastOutput, O>): Pipeline<O> {
    this.components.push(component);
    return this as any;
  }

  finally(final: (o: LastOutput) => Promise<void>) {
    return new Promise<void>((resolve) => {
      // If true, the producer will no longer produce any more elements.
      let ended = false;
      // How many elements produced by the producer are still in the pipeline.
      let pendingFinal = 0;
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
          const handleExit = () => {
            pendingFinal--;
            assertState(pendingFinal >= 0);
            if (!pendingFinal && ended) {
              resolve();
            }
          };
          if (output === undefined) {
            // Early exit.
            handleExit();
          } else {
            if (isLast) {
              final(output).then(handleExit);
            } else {
              push(idx + 1, output);
            }
          }
        }
        state[idx].driving--;
      };
      let drivingProducer = false;
      const ensureDrivingProducer = async () => {
        if (drivingProducer || ended) {
          return;
        }
        drivingProducer = true;
        while (!isFull(0)) {
          const output = await this.producer();
          if (output == undefined) {
            ended = true;
            break;
          }
          push(0, output);
          pendingFinal++;
        }
        drivingProducer = false;
      };
      ensureDrivingProducer();
    });
  }
}
