import assertState from "./assertState";
import mapExists from "./mapExists";

export default class YearMonth {
  constructor(readonly year: number, readonly month: number) {
    assertState(Number.isSafeInteger(year) && year >= 0 && year <= 9999);
    assertState(Number.isSafeInteger(month) && month >= 1 && month <= 12);
  }

  static ofDate(dt: Date) {
    return new YearMonth(dt.getFullYear(), dt.getMonth() + 1);
  }

  static parse(raw: string) {
    return mapExists(
      /^([0-9]{4})(0[1-9]|1[0-2])$/.exec(raw),
      ([_, y, m]) => new YearMonth(+y, +m)
    );
  }

  static now() {
    return YearMonth.ofDate(new Date());
  }

  startUtc(): Date {
    return new Date(Date.UTC(this.year, this.month - 1));
  }

  // WARNING: This is exclusive.
  endUtc(): Date {
    return new Date(Date.UTC(this.year, this.month + 1 - 1));
  }

  toJSON() {
    return this.toString();
  }

  toString() {
    return [
      this.year.toString().padStart(4, "0"),
      this.month.toString().padStart(2, "0"),
    ].join("");
  }
}
