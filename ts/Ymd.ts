import assertState from "./assertState";

// TODO Is this always true?
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

export default class Ymd {
  // Always use UTC for _dt:
  // - Consistency.
  // - Any calculations (e.g. .plus, .diff, .endOf) are never affected by any geopolitical/historical rules.
  // - Serialisation (e.g. .toISO) or formatting are always the expected year/month/day.
  // _dt must have 0 as its time components (and UTC as its zone, as previously mentioned).
  private constructor(private readonly _dt: Date) {
    assertState(
      _dt.getUTCHours() === 0,
      `Ymd DateTime.hour is ${_dt.getUTCHours()}`
    );
    assertState(
      _dt.getUTCMinutes() === 0,
      `Ymd DateTime.minute is ${_dt.getUTCMinutes()}`
    );
    assertState(
      _dt.getUTCSeconds() === 0,
      `Ymd DateTime.second is ${_dt.getUTCSeconds()}`
    );
    assertState(
      _dt.getUTCMilliseconds() === 0,
      `Ymd DateTime.millisecond is ${_dt.getUTCMilliseconds()}`
    );
  }

  // Ymd instances don't have timezones, but this uses the date in the local time zone (instead of something like UTC).
  static nowLocal() {
    const now = new Date();
    return Ymd.fromObject({
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    });
  }

  static fromDaysSinceEpoch(days: number) {
    return new Ymd(new Date(days * MILLISECONDS_IN_DAY));
  }

  static fromObject(obj: { year: number; month: number; day: number }) {
    return new Ymd(new Date(Date.UTC(obj.year, obj.month - 1, obj.day)));
  }

  static maybeFromISO(raw: string) {
    const m = /^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})$/.exec(raw);
    if (!m) {
      return undefined;
    }
    return Ymd.fromObject({ year: +m[1], month: +m[2], day: +m[3] });
  }

  static fromISO(raw: string) {
    return Ymd.maybeFromISO(raw) ?? new Ymd(new Date(NaN));
  }

  get isValid() {
    return !isNaN(this._dt.getTime());
  }

  get day() {
    return this._dt.getUTCDate();
  }

  get month() {
    return this._dt.getUTCMonth() + 1;
  }

  get year() {
    return this._dt.getUTCFullYear();
  }

  daysSinceEpoch() {
    return this._dt.getTime() / MILLISECONDS_IN_DAY;
  }

  with(obj: { year?: number; month?: number; day?: number }) {
    return Ymd.fromObject({
      day: obj.day ?? this.day,
      month: obj.month ?? this.month,
      year: obj.year ?? this.year,
    });
  }

  withUTCTime({
    hour,
    minute,
    second,
    millisecond,
  }: {
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  } = {}) {
    return new Date(
      Date.UTC(
        this._dt.getUTCFullYear(),
        this._dt.getUTCMonth(),
        this._dt.getUTCDate(),
        hour,
        minute,
        second,
        millisecond
      )
    );
  }

  compareTo(other: Ymd) {
    return (
      this.year - other.year || this.month - other.month || this.day - other.day
    );
  }

  equals(other: unknown) {
    if (typeof other != "object" || !other) {
      return false;
    }
    return (
      this.year === other["year"] &&
      this.month === other["month"] &&
      this.day === other["day"]
    );
  }

  hashCode() {
    return this.daysSinceEpoch();
  }

  toLocaleString(locales: string, opt: Intl.DateTimeFormatOptions) {
    return this._dt.toLocaleString(locales, opt);
  }

  toISO() {
    return [
      this._dt.getUTCFullYear().toString().padStart(4, "0"),
      (this._dt.getUTCMonth() + 1).toString().padStart(2, "0"),
      this._dt.getUTCDate().toString().padStart(2, "0"),
    ].join("-");
  }

  valueOf() {
    return this.daysSinceEpoch();
  }

  [Symbol.toPrimitive](hint: "number" | "string" | "default") {
    if (hint === "number") {
      return this.daysSinceEpoch();
    }
    if (hint === "string") {
      return this.toISO();
    }
    return null;
  }
}
