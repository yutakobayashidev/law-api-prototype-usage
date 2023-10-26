import { expect, describe, it, test } from "vitest";
import {
  AsOfSchema,
  DaySchema,
  MonthSchema,
  PromulgationDateFromSchema,
  PromulgationDateToSchema,
  UpdatedFromSchema,
  UpdatedToSchema,
  createDateSchema,
} from "@/lib/utils/zod-schemas/date-schemas";

describe("MonthSchema", () => {
  it("数字の文字列を有効として扱うべき", () => {
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].forEach(
      (value) => {
        const result = MonthSchema.safeParse(value);
        expect(result.success).toBe(true);
      }
    );
  });

  it("数値を有効として扱うべき", () => {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((value) => {
      const result = MonthSchema.safeParse(value);
      expect(result.success).toBe(true);
    });
  });

  it("1未満または12より大きい数字を無効にするべき", () => {
    ["0", "13", "14", "20", "-1", "1.1", "0.5"].forEach((value) => {
      const result = MonthSchema.safeParse(value);
      expect(result.success).toBe(false);

      expect(result.error?.errors[0]?.message).toBe(
        "月は1から12の数値である必要があります"
      );
    });
  });

  it("1未満または12より大きい数値を無効にするべき", () => {
    [0, 13, 14, 20, -1, 1.1, 0.5].forEach((value) => {
      const result = MonthSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "月は1から12の数値である必要があります"
      );
    });
  });

  it("無効な文字列を無効にするべき", () => {
    ["a", "b", "c", " ", "Jan", "Feb"].forEach((value) => {
      const result = MonthSchema.safeParse(value);
      expect(result.success).toBe(false);

      expect(result.error?.errors[0]?.message).toBe(
        "月は1から12の数値である必要があります"
      );
    });
  });
});

describe("DaySchema", () => {
  it("有効な日（文字列）を検証するべき", () => {
    ["1", "15", "31"].forEach((value) => {
      const result = DaySchema.safeParse(value);
      expect(result.success).toBe(true);
    });
  });

  it("有効な日（数値）を検証するべき", () => {
    [1, 15, 31].forEach((value) => {
      const result = DaySchema.safeParse(value);
      expect(result.success).toBe(true);
    });
  });

  it("無効な日（文字列）を無効にするべき", () => {
    ["0", "32", "35", "100", "-1", "1.1", "0.5"].forEach((value) => {
      const result = DaySchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "日は1から31の数値である必要があります"
      );
    });
  });

  it("無効な日（数値）を無効にするべき", () => {
    [0, 32, 35, 100, -1, 1.1, 0.5].forEach((value) => {
      const result = DaySchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "日は1から31の数値である必要があります"
      );
    });
  });
});

describe("createDateSchema", () => {
  const errorMessage = "test error message";
  const schema = createDateSchema(errorMessage, ["test"]);

  it("正しい日付文字列を検証するべき", () => {
    const result = schema.safeParse("2023-09-25");
    expect(result.success).toBe(true);
  });

  it("不正な日付文字列を無効にするべき", () => {
    const result = schema.safeParse("not-a-date");
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toBe(errorMessage);
  });

  it("undefined値は許容するべき", () => {
    const result = schema.safeParse(undefined);
    expect(result.success).toBe(true);
  });

  it("数値を無効にするべき", () => {
    const result = schema.safeParse(12345);
    expect(result.success).toBe(false);
    expect(result.error?.errors[0]?.message).toBe(errorMessage);
  });
});

describe("各日付スキーマ", () => {
  const invalidValues = [12345, "not-a-date", null];

  test.each(invalidValues)(
    "AsOfSchemaは不正な値に対して正しいエラーメッセージを返すべき: %p",
    (value) => {
      const result = AsOfSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "時点指定の値に誤りがあります"
      );
    }
  );

  test.each(invalidValues)(
    "PromulgationDateFromSchemaは不正な値に対して正しいエラーメッセージを返すべき: %p",
    (value) => {
      const result = PromulgationDateFromSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "公布日の値に誤りがあります"
      );
    }
  );

  test.each(invalidValues)(
    "PromulgationDateToSchemaは不正な値に対して正しいエラーメッセージを返すべき: %p",
    (value) => {
      const result = PromulgationDateToSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "公布日の値に誤りがあります"
      );
    }
  );

  test.each(invalidValues)(
    "UpdatedFromSchemaは不正な値に対して正しいエラーメッセージを返すべき: %p",
    (value) => {
      const result = UpdatedFromSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "改正日の値に誤りがあります"
      );
    }
  );

  test.each(invalidValues)(
    "UpdatedToSchemaは不正な値に対して正しいエラーメッセージを返すべき: %p",
    (value) => {
      const result = UpdatedToSchema.safeParse(value);
      expect(result.success).toBe(false);
      expect(result.error?.errors[0]?.message).toBe(
        "改正日の値に誤りがあります"
      );
    }
  );
});
