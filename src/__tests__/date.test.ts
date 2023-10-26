import { expect, describe, it } from "vitest";
import {
  convertToDate,
  formatISOToTokyoDate,
  getEraAndEraYear,
  isCompleteDateForm,
  isFullySpecifiedOrEmptyDate,
  isValidJapaneseDateField,
  setTimezoneStartOrEndDayInTokyo,
  toJapaneseEra,
} from "@/lib/utils/date";
import { TargetDateForm } from "@/hooks/target-date-search-form-hooks";
import { Era } from "@/lib/typescript-fetch";

describe("toJapaneseEra", () => {
  it("明治の日付に対して正しい日本の元号を返す", () => {
    const result = toJapaneseEra(new Date("1868-01-01"));
    expect(result).toBe("明治元年1月1日");
  });

  it("大正の日付に対して正しい日本の元号を返す", () => {
    const result = toJapaneseEra(new Date("1926-12-24"));
    expect(result).toBe("大正15年12月24日");
  });

  it("昭和の日付に対して正しい日本の元号を返す", () => {
    const result = toJapaneseEra(new Date("1989-01-07"));
    expect(result).toBe("昭和64年1月7日");
  });

  it("平成の日付に対して正しい日本の元号を返す", () => {
    const result = toJapaneseEra(new Date("2019-04-30"));
    expect(result).toBe("平成31年4月30日");
  });

  it("令和の日付に対して正しい日本の元号を返す", () => {
    const result = toJapaneseEra(new Date("2021-01-01"));
    expect(result).toBe("令和3年1月1日");
  });

  it("明治以前の日付に対してエラーをスロー", () => {
    expect(() => {
      toJapaneseEra(new Date("1867-12-31"));
    }).toThrow("Unsupported date");
  });

  it("令和の日付で漢数字フラグがtrueの場合、正しい日本の元号と日付を漢数字で返す", () => {
    const result = toJapaneseEra(new Date("2021-10-29T00:00:00.000Z"), true);
    expect(result).toBe("令和三年十月二十九日");
  });

  it("平成の日付に対して漢数字を用いて正しい日本の元号を返す", () => {
    const result = toJapaneseEra(new Date("2019-12-30"), true);
    expect(result).toBe("令和元年十二月三十日");
  });
});

describe("isCompleteDateForm", () => {
  it("targetDateのすべてのプロパティが定義されている場合はtrueを返すべき", () => {
    const targetDate: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    expect(isCompleteDateForm(targetDate)).toBe(true);
  });

  it("targetDateのいずれかのプロパティが未定義の場合はfalseを返すべき", () => {
    const targetDate: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
    };
    expect(isCompleteDateForm(targetDate)).toBe(false);
  });
});

describe("isFullySpecifiedOrEmptyDateのテスト", () => {
  it("年、月、日がすべて指定されている場合、trueを返す", () => {
    const input: TargetDateForm = {
      era: Era.Showa,
      year: "1989",
      month: "1",
      day: "7",
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(true);
  });

  it("年、月、日がすべてnullの場合、trueを返す", () => {
    const input: TargetDateForm = {
      era: Era.Heisei,
      year: null,
      month: null,
      day: null,
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(true);
  });

  it("年だけが指定されている場合、falseを返す", () => {
    const input: TargetDateForm = {
      era: Era.Reiwa,
      year: "2023",
      month: null,
      day: null,
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(false);
  });

  it("月と日だけが指定されている場合、falseを返す", () => {
    const input: TargetDateForm = {
      era: Era.Meiji,
      year: null,
      month: "9",
      day: "20",
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(false);
  });

  it("年と月だけが指定されている場合、falseを返す", () => {
    const input: TargetDateForm = {
      era: Era.Reiwa,
      year: "2023",
      month: "9",
      day: null,
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(false);
  });

  it("年と日だけが指定されている場合、falseを返す", () => {
    const input: TargetDateForm = {
      era: Era.Reiwa,
      year: "2023",
      month: null,
      day: "20",
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(false);
  });

  it("月だけが指定されている場合、falseを返す", () => {
    const input: TargetDateForm = {
      era: Era.Reiwa,
      year: null,
      month: "9",
      day: null,
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(false);
  });

  it("日だけが指定されている場合、falseを返す", () => {
    const input: TargetDateForm = {
      era: Era.Reiwa,
      year: null,
      month: null,
      day: "20",
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(false);
  });

  it("年、月、日が空文字の場合、trueを返す", () => {
    const input: TargetDateForm = {
      era: Era.Reiwa,
      year: "",
      month: "",
      day: "",
    };
    expect(isFullySpecifiedOrEmptyDate(input)).toBe(true);
  });
});

describe("convertToDate", () => {
  it("必要な情報が欠けている場合にnullを返す", () => {
    const result = convertToDate({
      era: "Reiwa",
      year: "3",
      month: "10",
    });
    expect(result).toBeNull();
  });

  it("未知の元号が指定された場合にnullを返す", () => {
    const result = convertToDate({
      era: "Foo",
      year: "2022",
      month: "10",
      day: "31",
    });
    expect(result).toBeNull();
  });

  it("有効な情報が与えられた場合にDateオブジェクトを返す", () => {
    const result = convertToDate({
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "31",
    });
    expect(result).toBeInstanceOf(Date);
    expect(result.getFullYear()).toBe(2021);
    expect(result.getMonth()).toBe(9);
    expect(result.getDate()).toBe(31);
  });
});

describe("isValidJapaneseDateField", () => {
  it("元号が有効な場合はtrueを返すべき", () => {
    const targetDateForm: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    const key = "era";
    const value = "Reiwa";
    expect(isValidJapaneseDateField(targetDateForm, key, value)).toBe(true);
  });

  it("年が有効な場合はtrueを返すべき", () => {
    const targetDateForm: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    const key = "year";
    const value = "3";
    expect(isValidJapaneseDateField(targetDateForm, key, value)).toBe(true);
  });

  it("年が無効な場合はfalseを返すべき", () => {
    const targetDateForm: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    const key = "year";
    const value = "00";
    expect(isValidJapaneseDateField(targetDateForm, key, value)).toBe(false);
  });

  it("月が有効な場合はtrueを返すべき", () => {
    const targetDateForm: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    const key = "month";
    const value = "10";
    expect(isValidJapaneseDateField(targetDateForm, key, value)).toBe(true);
  });

  it("月が無効な場合はfalseを返すべき", () => {
    const targetDateForm: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    const key = "month";
    const value = "13";
    expect(isValidJapaneseDateField(targetDateForm, key, value)).toBe(false);
  });

  it("日が有効な場合はtrueを返すべき", () => {
    const targetDateForm: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    const key = "day";
    const value = "1";
    expect(isValidJapaneseDateField(targetDateForm, key, value)).toBe(true);
  });

  it("日が無効な場合はfalseを返すべき", () => {
    const targetDateForm: TargetDateForm = {
      era: "Reiwa",
      year: "3",
      month: "10",
      day: "1",
    };
    const key = "day";
    const value = "32";
    expect(isValidJapaneseDateField(targetDateForm, key, value)).toBe(false);
  });
});

describe("getEraAndEraYear", () => {
  it("明治時代の日付に対して、明治とその時代の年を返す", () => {
    expect(getEraAndEraYear(1868, 1, 1)).toEqual({
      era: "Meiji",
      eraYear: "1",
    });
    expect(getEraAndEraYear(1912, 7, 29)).toEqual({
      era: "Meiji",
      eraYear: "45",
    });
  });

  it("大正時代の日付に対して、大正とその時代の年を返す", () => {
    expect(getEraAndEraYear(1912, 7, 30)).toEqual({
      era: "Taisho",
      eraYear: "1",
    });
    expect(getEraAndEraYear(1926, 12, 24)).toEqual({
      era: "Taisho",
      eraYear: "15",
    });
  });

  it("昭和時代の日付に対して、昭和とその時代の年を返す", () => {
    expect(getEraAndEraYear(1926, 12, 25)).toEqual({
      era: "Showa",
      eraYear: "1",
    });
    expect(getEraAndEraYear(1989, 1, 7)).toEqual({
      era: "Showa",
      eraYear: "64",
    });
  });

  it("平成時代の日付に対して、平成とその時代の年を返す", () => {
    expect(getEraAndEraYear(1989, 1, 8)).toEqual({
      era: "Heisei",
      eraYear: "1",
    });
    expect(getEraAndEraYear(2019, 4, 30)).toEqual({
      era: "Heisei",
      eraYear: "31",
    });
  });

  it("令和時代の日付に対して、令和とその時代の年を返す", () => {
    expect(getEraAndEraYear(2019, 5, 1)).toEqual({
      era: "Reiwa",
      eraYear: "1",
    });
    expect(getEraAndEraYear(2020, 5, 1)).toEqual({
      era: "Reiwa",
      eraYear: "2",
    });
  });
});

describe("formatISOToTokyoDate関数のテスト", () => {
  it("特定のISO日付文字列を東京タイムゾーンの日付文字列にフォーマットする", () => {
    const isoString = "2023-07-01T05:00:00.000Z"; // UTC time
    const expectedResult = "2023-07-01"; // Tokyo time (UTC+9)

    const result = formatISOToTokyoDate(isoString);

    expect(result).toBe(expectedResult);
  });

  it("月末を正しく処理する", () => {
    const isoString = "2023-07-31T15:00:00.000Z"; // UTC time
    const expectedResult = "2023-08-01"; // Tokyo time (UTC+9)

    const result = formatISOToTokyoDate(isoString);

    expect(result).toBe(expectedResult);
  });

  it("無効なISO文字列に対してエラーをスローする", () => {
    const invalidISOString = "invalid-date-string";

    expect(() => formatISOToTokyoDate(invalidISOString)).toThrowError();
  });
});

describe("setTimezoneStartOrEndDayInTokyo", () => {
  it('dayBoundaryが "start" のときに時間を 00:00:00 に設定するべき', () => {
    const date = new Date("2023-01-01T12:00:00Z");
    const expectedDate = new Date("2023-01-01T00:00:00.000Z");
    const result = setTimezoneStartOrEndDayInTokyo(date, "start");
    expect(result).toEqual(expectedDate);
  });

  it('dayBoundaryが "end" のときに時間を 23:59:59 に設定するべき', () => {
    const date = new Date("2023-01-01T12:00:00Z");
    const expectedDate = new Date("2023-01-01T23:59:59.999Z");
    const result = setTimezoneStartOrEndDayInTokyo(date, "end");
    expect(result).toEqual(expectedDate);
  });
});
