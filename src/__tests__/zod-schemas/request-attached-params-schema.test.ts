import { RequestAttachedParamsSchema } from "@/lib/utils/zod-schemas/request-attached-params-schema";
import { expect, describe, it } from "vitest";

describe("RequestAttachedParamsSchema", () => {
  it("正しいオブジェクトを検証するべき", () => {
    const input = {
      lawRevisionId: "12345",
      src: "some-source",
    };
    const result = RequestAttachedParamsSchema.safeParse(input);
    expect(result.success).toBe(true);
  });

  it("法令履歴IDが空の場合、オブジェクトを無効にするべき", () => {
    const input = {
      lawRevisionId: "",
      src: "some-source",
    };
    const result = RequestAttachedParamsSchema.safeParse(input);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toBe(
      "法令履歴ID(完全一致)の入力は必須です"
    );
  });

  it("srcプロパティがない場合、オブジェクトを検証するべき", () => {
    const input = {
      lawRevisionId: "12345",
    };
    const result = RequestAttachedParamsSchema.safeParse(input);
    expect(result.success).toBe(true);
  });
});
