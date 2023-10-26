import { expect, describe, it } from "vitest";
import {
  buildQueryString,
  getAllSearchParamsAsString,
  getOffsetByPage,
  isAllPropsUndefined,
  numbersToKanji,
  updateCheckboxItems,
} from "@/lib/utils/helper";
import { CheckboxItemType } from "@/types/common";

describe("getAllSearchParamsAsString", () => {
  it("空のURLSearchParamsオブジェクトが与えられた場合、空文字列を返す", () => {
    const urlSearchParams = new URLSearchParams();
    const result = getAllSearchParamsAsString(urlSearchParams);
    expect(result).toBe("");
  });

  it('すべてのキーと値のペアを"&"で結合した文字列を返す', () => {
    const urlSearchParams = new URLSearchParams({
      key1: "value1",
      key2: "value2",
    });
    const result = getAllSearchParamsAsString(urlSearchParams);
    expect(result).toBe("key1=value1&key2=value2");
  });
});

describe("buildQueryString", () => {
  it("オブジェクトからqueryStringを構築する必要があります", () => {
    const params = {
      key1: "value1",
      key2: 2,
      key3: true,
      key4: null,
      key5: undefined,
      key6: "",
    };

    const result = buildQueryString(params);

    expect(result).toEqual("key1=value1&key2=2&key3=true");
  });

  it("空のオブジェクトを受け取った場合、空のクエリストリングを返す必要があります", () => {
    const params = {};
    const result = buildQueryString(params);
    expect(result).toEqual("");
  });

  it("すべてのキーが無効な値を持っている場合、空のクエリストリングを返す必要があります", () => {
    const params = {
      key1: null,
      key2: undefined,
      key3: "",
    };
    const result = buildQueryString(params);
    expect(result).toEqual("");
  });

  it("Boolean 値を正しく処理する必要があります", () => {
    const params = {
      key1: true,
      key2: false,
    };
    const result = buildQueryString(params);
    expect(result).toEqual("key1=true&key2=false");
  });

  it("数字の値を正しく処理する必要があります", () => {
    const params = {
      key1: 123,
      key2: 0,
    };
    const result = buildQueryString(params);
    expect(result).toEqual("key1=123&key2=0");
  });
});

describe("isAllPropsUndefined", () => {
  // 全てのプロパティがundefinedの場合
  it("全てのプロパティがundefinedである場合はtrueを返すべき", () => {
    const obj = {
      key1: undefined,
      key2: undefined,
      key3: undefined,
    };
    expect(isAllPropsUndefined(obj)).toBe(true);
  });

  // 一部のプロパティがundefinedでない場合
  it("一部のプロパティがundefinedでない場合はfalseを返すべき", () => {
    const obj = {
      key1: undefined,
      key2: "value",
      key3: undefined,
    };
    expect(isAllPropsUndefined(obj)).toBe(false);
  });

  // 全てのプロパティがundefinedでない場合
  it("全てのプロパティがundefinedでない場合はfalseを返すべき", () => {
    const obj = {
      key1: "value1",
      key2: "value2",
      key3: "value3",
    };
    expect(isAllPropsUndefined(obj)).toBe(false);
  });

  // オブジェクトが空の場合
  it("オブジェクトが空の場合はtrueを返すべき", () => {
    const obj = {};
    expect(isAllPropsUndefined(obj)).toBe(true);
  });

  // nullや数字など、他の型が含まれる場合
  it("他の型が含まれる場合はfalseを返すべき", () => {
    const obj = {
      key1: undefined,
      key2: null,
      key3: 42,
    };
    expect(isAllPropsUndefined(obj)).toBe(false);
  });
});

describe("getOffsetByPage", () => {
  // offsetLimitは20

  // 1ページ目の場合
  it("1ページ目の場合はオフセットが0であるべき", () => {
    expect(getOffsetByPage(1)).toBe(0);
  });

  // 2ページ目の場合
  it("2ページ目の場合はオフセットが20であるべき", () => {
    expect(getOffsetByPage(2)).toBe(20);
  });

  // ページ番号が0以下の場合
  it("ページ番号が0以下の場合はオフセットが0であるべき", () => {
    expect(getOffsetByPage(0)).toBe(0);
    expect(getOffsetByPage(-1)).toBe(0);
    expect(getOffsetByPage(-2)).toBe(0);
  });
});

describe("numbersToKanji", () => {
  it("数値を正しく漢数字に変換する", () => {
    expect(numbersToKanji(1)).toBe("一");
    expect(numbersToKanji(10)).toBe("十");
    expect(numbersToKanji(11)).toBe("十一");
    expect(numbersToKanji(20)).toBe("二十");
    expect(numbersToKanji(21)).toBe("二十一");
    expect(numbersToKanji(100)).toBe("百");
    // 他の正常なテストケース
  });

  it("特殊ケースを正しく処理する", () => {
    expect(numbersToKanji("元")).toBe("元");
    expect(numbersToKanji(null)).toBe("");
    expect(numbersToKanji(undefined)).toBe("");
    expect(numbersToKanji("")).toBe("");
  });

  it('"マイナス"と共に負の数を漢数字に変換する', () => {
    expect(numbersToKanji(-1)).toBe("マイナス一");
    // 他のマイナス値に関するテストケース
  });

  it("無効な入力でTypeErrorをスローする", () => {
    expect(() => numbersToKanji("abc")).toThrow(TypeError);
    expect(() => numbersToKanji("1a2")).toThrow(TypeError);
    // 他の不正な入力値に関するテストケース
  });

  it("安全な整数範囲外の数値でRangeErrorをスローする", () => {
    expect(() => numbersToKanji(Number.MAX_SAFE_INTEGER + 1)).toThrow(
      RangeError
    );
    expect(() => numbersToKanji(Number.MIN_SAFE_INTEGER - 1)).toThrow(
      RangeError
    );
  });
});

describe("updateCheckboxItems", () => {
  it("入力リストに基づいてチェックボックスの状態のレコードを返すべき", () => {
    const checkboxList: CheckboxItemType<string>[] = [
      { id: "1", checked: true, label: "test1", name: "1", disabled: false },
      { id: "2", checked: false, label: "test2", name: "2", disabled: false },
      { id: "3", checked: true, label: "test3", name: "3", disabled: false },
    ];

    const expectedOutput = {
      "1": true,
      "2": false,
      "3": true,
    };

    expect(updateCheckboxItems({ checkboxList })).toEqual(expectedOutput);
  });

  it("提供されている場合、isSelectedでチェックボックスの状態を上書きするべき", () => {
    const checkboxList: CheckboxItemType<string>[] = [
      { id: "1", checked: true, label: "test1", name: "1", disabled: false },
      { id: "2", checked: false, label: "test2", name: "2", disabled: false },
      { id: "3", checked: true, label: "test3", name: "3", disabled: false },
    ];

    const expectedOutput = {
      "1": false,
      "2": false,
      "3": false,
    };

    expect(updateCheckboxItems({ checkboxList, isSelected: false })).toEqual(
      expectedOutput
    );
  });
});
