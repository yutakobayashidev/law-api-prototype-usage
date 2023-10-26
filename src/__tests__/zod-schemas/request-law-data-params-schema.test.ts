import {
  RequestLawDataParams,
  RequestLawDataParamsSchema,
} from "@/lib/utils/zod-schemas/request-law-data-params-schema";
import { expect, describe, it } from "vitest";

describe("RequestLawDataParamsSchema", () => {
  it("有効な入力を許可するべき", () => {
    const validInput: RequestLawDataParams = {
      lawId: "valid-law-id",
      asof: "2022-01-01",
    };
    const result = RequestLawDataParamsSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("法令IDが空の場合は許可すべきでない", () => {
    const invalidInput: RequestLawDataParams = {
      lawId: "",
      asof: "2022-01-01",
    };
    const result = RequestLawDataParamsSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe(
      "法令IDの入力は必須です(完全一致)"
    );
  });

  it("無効な日付は許可しないべき", () => {
    const invalidInput: RequestLawDataParams = {
      lawId: "valid-law-id",
      asof: "invalid-date",
    };
    const result = RequestLawDataParamsSchema.safeParse(invalidInput);
    expect(result.success).toBe(false);
  });
});
