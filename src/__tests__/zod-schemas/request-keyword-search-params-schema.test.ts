import { RequestKeywordSearchParamsSchema } from "@/lib/utils/zod-schemas/request-keyword-search-params-schema";
import { expect, describe, it } from "vitest";

describe("RequestKeywordSearchParamsSchema", () => {
  it("有効な入力を許可するべき", () => {
    const validInput = {
      keyword: "valid-keyword",
      asof: "2022-01-01",
      page: "1",
      orderNo: "1",
    };
    const result = RequestKeywordSearchParamsSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("空のキーワードは許可しない", () => {
    const invalidInput = {
      keyword: "",
      asof: "2022-01-01",
      page: "1",
      orderNo: "1",
    };
    const result = RequestKeywordSearchParamsSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("キーワードの入力は必須です");
  });

  it("無効な日付は許可しない", () => {
    const invalidInput = {
      keyword: "valid-keyword",
      asof: "invalid-date",
      page: "1",
      orderNo: "1",
    };
    const result = RequestKeywordSearchParamsSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });

  it("ページ番号指定がない場合も許可すべき", () => {
    const validInput = {
      keyword: "valid-keyword",
      asof: "2022-01-01",
      orderNo: "1",
    };
    const result = RequestKeywordSearchParamsSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("orderNoがない場合も許可すべき", () => {
    const validInput = {
      keyword: "valid-keyword",
      asof: "2022-01-01",
      page: "1",
    };
    const result = RequestKeywordSearchParamsSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });
});
