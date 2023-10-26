import { LawsApiApi } from "@/lib/typescript-fetch";
import { expect, describe, it, vi, afterEach } from "vitest";
import * as apiModule from "@/lib/utils/api";
import { getAttachment } from "@/lib/api/get-attachment";

const successResponse = new Blob();

describe("getAttachment関数のテスト", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("成功時に添付ファイルデータを返すべき", async () => {
    const apiClient = {
      getAttached: vi.fn().mockResolvedValue(successResponse),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getAttachment({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      src: "./pict/R01F210001_011.jpg",
    });

    expect(apiModule.getApiClient).toHaveBeenCalled();
    expect(apiClient.getAttached).toHaveBeenCalledWith({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      src: "./pict/R01F210001_011.jpg",
    });
    expect(result).toEqual({
      isSuccess: true,
      value: successResponse,
    });
  });

  it("失敗時にエラーを返すべき", async () => {
    const apiClient = {
      getAttached: vi.fn().mockRejectedValue(new Error("mock error")),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getAttachment({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      src: "./pict/R01F210001_011.jpg",
    });

    expect(apiModule.getApiClient).toHaveBeenCalled();
    expect(apiClient.getAttached).toHaveBeenCalledWith({
      lawRevisionId: "501R00000001001_20190528_000000000000000",
      src: "./pict/R01F210001_011.jpg",
    });
    expect(result).toEqual({
      isSuccess: false,
      error: new Error("API error: Error: mock error"),
    });
  });

  it("バリデーションエラー時にエラーを返すべき", async () => {
    const result = await getAttachment({
      lawRevisionId: "",
    });

    expect(result).toEqual({
      isSuccess: false,
      error: new Error("法令履歴ID(完全一致)の入力は必須です"),
    });
  });
});
