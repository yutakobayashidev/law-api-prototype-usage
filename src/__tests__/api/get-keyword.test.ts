import { LawsApiApi } from "@/lib/typescript-fetch";
import { expect, describe, it, vi, afterEach } from "vitest";
import * as apiModule from "@/lib/utils/api";
import { getLawDataFromKeyword } from "@/lib/api/get-keyword";

const successResponse = {
  keyword: "",
  law: {},
};

describe("getLawDataFromKeyword関数のテスト", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("成功時にキーワードデータを返すべき", async () => {
    const apiClient = {
      getKeyword: vi.fn().mockResolvedValue(successResponse),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getLawDataFromKeyword({
      keyword: "test",
      asof: undefined,
      page: undefined,
      orderNo: undefined,
    });

    expect(apiClient.getKeyword).toHaveBeenCalledWith({
      keyword: "test",
      asof: undefined,
      offset: 0,
      orderNo: 1,
      limit: 20,
    });
    expect(result).toEqual({
      isSuccess: true,
      value: successResponse,
    });
  });

  it("失敗時にエラーを返すべき", async () => {
    const apiClient = {
      getKeyword: vi.fn().mockRejectedValue(new Error("mock error")),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getLawDataFromKeyword({
      keyword: "test",
      asof: "2022-01-01",
      page: undefined,
      orderNo: undefined,
    });

    expect(apiClient.getKeyword).toHaveBeenCalledWith({
      keyword: "test",
      asof: new Date("2022-01-01"),
      offset: 0,
      orderNo: 1,
      limit: 20,
    });
    expect(result).toEqual({
      isSuccess: false,
      error: new Error("API error: Error: mock error"),
    });
  });

  it("バリデーションエラー時にエラーを返すべき", async () => {
    const result = await getLawDataFromKeyword({
      keyword: "",
    });

    expect(result).toEqual({
      isSuccess: false,
      error: new Error("キーワードの入力は必須です"),
    });
  });
});
