import assertState from "./assertState";

// TODO Is this always true?
const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;

// We can't name this Date as it conflicts with the builtin type.
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
    return Ymd.fromDateLocal(new Date());
  }

  static nowUTC() {
    return Ymd.fromDateUTC(new Date());
  }

  static fromDaysSinceEpoch(days: number) {
    return new Ymd(new Date(days * MILLISECONDS_IN_DAY));
  }

  static fromDateUTC(date: Date) {
    // We can't just `new Ymd(date)` as the constructor will assert time components are zero.
    return Ymd.fromObject({
      day: date.getUTCDate(),
      month: date.getUTCMonth() + 1,
      year: date.getUTCFullYear(),
    });
  }

  static fromDateLocal(date: Date) {
    return Ymd.fromObject({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    });
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

  compareTo(other: Ymd) {
    return (
      this.year - other.year || this.month - other.month || this.day - other.day
    );
  }

  equals(other: any) {
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
      this.year.toString().padStart(4, "0"),
      this.month.toString().padStart(2, "0"),
      this.day.toString().padStart(2, "0"),
    ].join("-");
  }

  toDateLocal(hour = 0, minute = 0, second = 0, ms = 0) {
    return new Date(
      this.year,
      this.month - 1,
      this.day,
      hour,
      minute,
      second,
      ms
    );
  }

  toDateUTC(hour = 0, minute = 0, second = 0, ms = 0) {
    return new Date(
      Date.UTC(this.year, this.month - 1, this.day, hour, minute, second, ms)
    );
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
