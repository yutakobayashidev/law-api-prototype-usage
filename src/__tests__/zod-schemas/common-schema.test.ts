import { expect, describe, it } from "vitest";
import { PageSchema, SortSchema } from "@/lib/utils/zod-schemas/common-schema";

describe("SortSchema", () => {
  it("範囲1から5内の値を正しく検証するべき", () => {
    ["1", "2", "3", "4", "5"].forEach((value) => {
      const result = SortSchema.safeParse(value);
      expect(result.success).toBe(true);
    });
  });

  it("範囲1から5外の値を無効にするべき", () => {
    ["0", "6", "a", "b", "z"].forEach((value) => {
      const result = SortSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "ソートの値は1から5の整数の範囲内でなければなりません"
      );
      expect(result.error?.errors[0]?.path).toEqual(["sort"]);
    });
  });

  it("小数点と負の値を無効にするべき", () => {
    ["1.1", "2.5", "-1", "-3"].forEach((value) => {
      const result = SortSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "ソートの値は1から5の整数の範囲内でなければなりません"
      );
    });
  });
});

describe("PageSchema", () => {
  it("数字の文字列を正しく検証するべき", () => {
    ["1", "2", "10", "100"].forEach((value) => {
      const result = PageSchema.safeParse(value);
      expect(result.success).toBe(true);
    });
  });

  it("0から始まる文字列を無効にするべき", () => {
    ["0", "01"].forEach((value) => {
      const result = PageSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "ページ番号は1から始まる数字の文字列である必要があります"
      );
    });
  });

  it("数字の文字列でない値を無効にするべき", () => {
    ["a", "b", "z", "", " ", "1a", "1.1"].forEach((value) => {
      const result = PageSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "ページ番号は1から始まる数字の文字列である必要があります"
      );
    });
  });
});
