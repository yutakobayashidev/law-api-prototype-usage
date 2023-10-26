import { ResultLawListSearchParamsSchema } from "@/lib/utils/zod-schemas/request-law-list-search-params-schema";
import { expect, describe, it } from "vitest";

describe("ResultLawListSearchParamsSchema", () => {
  it("有効な入力を許可するべき", () => {
    const validInput = {
      lawTitle: "valid-law-title",
      lawNum: "valid-law-num",
      lawType: "Constitution,Act,CabinetOrder",
      asof: "2022-01-01",
      promulgationDateFrom: "2022-01-01",
      promulgationDateTo: "2022-01-31",
      categoryCd: "001,002,003",
      updatedFrom: "2022-01-01",
      updatedTo: "2022-01-31",
      page: "1",
      orderNo: "1",
    };
    const result = ResultLawListSearchParamsSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("未定義のオプションプロパティを許可するべき", () => {
    const validInput = {
      asof: "2022-01-01",
    };
    const result = ResultLawListSearchParamsSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("無効な入力を許可しないべき", () => {
    const invalidInput = {
      lawTitle: "",
      lawNum: "",
      lawType: "Constitution,InvalidLawType,CabinetOrder",
      asof: "invalid-date",
      promulgationDateFrom: "invalid-date",
      promulgationDateTo: "invalid-date",
      categoryCd: "invalid-category-cd",
      updatedFrom: "invalid-date",
      updatedTo: "invalid-date",
      page: "invalid-page",
      orderNo: "invalid-order-no",
    };
    const result = ResultLawListSearchParamsSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});
