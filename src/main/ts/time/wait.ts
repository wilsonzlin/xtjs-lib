import {Countdown} from "time/Countdown";
import {Duration} from "time/Duration";

export const wait = (duration: Duration) => new Countdown(duration);
