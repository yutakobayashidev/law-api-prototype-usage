import { expect, describe, it, vi, afterEach } from "vitest";
import * as apiModule from "@/lib/utils/api";
import { LawsApiApi } from "@/lib/typescript-fetch";
import { getRevision } from "@/lib/api/get-revision";

const successResponse = {
  law_info: {},
  revisions: [],
};

describe("getRevision関数のテスト", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("成功時にリビジョンを返すべき", async () => {
    // モック関数の戻り値をセットアップ
    const apiClient = {
      getRevisions: vi.fn().mockResolvedValue(successResponse),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getRevision({ lawId: "505M60080000001" });

    expect(apiClient.getRevisions).toHaveBeenCalledWith({
      lawId: "505M60080000001",
    });
    expect(result).toEqual({
      isSuccess: true,
      value: successResponse,
    });
  });

  it("失敗時にエラーを返すべき", async () => {
    const apiClient = {
      getRevisions: vi.fn().mockRejectedValue(new Error("mock error")),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getRevision({ lawId: "some-law-id" });

    expect(apiClient.getRevisions).toHaveBeenCalledWith({
      lawId: "some-law-id",
    });
    expect(result).toEqual({
      isSuccess: false,
      error: new Error("API error: Error: mock error"),
    });
  });

  it("バリデーションエラー時にエラーを返すべき", async () => {
    const result = await getRevision({ lawId: "" });

    expect(result).toEqual({
      isSuccess: false,
      error: new Error("法令IDの入力は必須です(完全一致)"),
    });
  });
});
