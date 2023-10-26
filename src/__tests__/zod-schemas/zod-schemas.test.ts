import { ResultLawListSearchParamsSchema } from "@/lib/utils/zod-schemas/request-law-list-search-params-schema";
import { expect, describe, it } from "vitest";

describe("ResultLawListSearchParamsSchema", () => {
  it("should validate a fully populated object", () => {
    const searchParams = {
      lawTitle: "ギャンブル等依存症対策基本法",
      lawNum: "平成三十年法律第七十四号",
      lawType: "Constitution,Act",
      asof: "2021-09-01",
      promulgationDateFrom: "2021-01-01",
      promulgationDateTo: "2021-12-31",
      categoryCd: "001,002,003",
      updatedFrom: "2021-01-01",
      updatedTo: "2021-12-31",
      page: "1",
      orderNo: "2",
    };

    const result = ResultLawListSearchParamsSchema.safeParse(searchParams);
    expect(result.success).toBe(true);
  });

  it("should validate an object with only required fields", () => {
    const searchParams = {
      asof: "2021-09-01",
    };

    const result = ResultLawListSearchParamsSchema.safeParse(searchParams);
    expect(result.success).toBe(true);
  });

  it("should invalidate an object with invalid lawType", () => {
    const searchParams = {
      lawType: "InvalidType",
      asof: "2021-09-01",
    };

    const result = ResultLawListSearchParamsSchema.safeParse(searchParams);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toBe(
      "法令種別の値に誤りがあります"
    );
  });
});
