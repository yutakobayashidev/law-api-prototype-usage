import { RequestRevisionParamsSchema } from "@/lib/utils/zod-schemas/request-revision-params-schema";
import { expect, describe, it } from "vitest";

describe("RequestRevisionParamsSchema", () => {
  it("有効な入力を検証するべき", () => {
    const input = { lawId: "12345" };
    const result = RequestRevisionParamsSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("lawIdが空文字の場合に無効にするべき", () => {
    const input = { lawId: "" };
    const result = RequestRevisionParamsSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toBe(
      "法令IDの入力は必須です(完全一致)"
    );
  });

  it("lawIdが文字列でない場合に無効にするべき", () => {
    const input = { lawId: 12345 };
    const result = RequestRevisionParamsSchema.safeParse(input);
    expect(result.success).toBe(false);
    // このエラーメッセージはZodのデフォルトのエラーメッセージです
    expect(result.error?.errors[0]?.message).toBe(
      "Expected string, received number"
    );
  });
});
