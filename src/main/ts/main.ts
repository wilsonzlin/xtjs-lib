import {Countdown} from "./Countdown";
import {Stopwatch} from "./Stopwatch";
import {Duration} from "./common";

export {
  Countdown,
  Stopwatch,
  Duration,
};

export const wait = (duration: Duration) => new Countdown(duration);
