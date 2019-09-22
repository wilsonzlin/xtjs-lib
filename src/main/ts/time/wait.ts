import { Duration } from "./Duration";
import { Countdown } from "./Countdown";

export const wait = (duration: Duration) => new Countdown(duration);
