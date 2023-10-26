import { LawsApiApi } from "@/lib/typescript-fetch";
import { expect, describe, it, vi, afterEach } from "vitest";
import * as apiModule from "@/lib/utils/api";
import { getLawList } from "@/lib/api/get-law-list";

const successResponse = {
  laws: [],
  total: 0,
};

describe("getLawList関数のテスト", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("成功時に法令一覧を返すべき", async () => {
    const apiClient = {
      getLawlist: vi.fn().mockResolvedValue(successResponse),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getLawList({
      asof: undefined,
      categoryCd: undefined,
      lawType: undefined,
      orderNo: "1",
      promulgationDateFrom: undefined,
      promulgationDateTo: undefined,
      updatedFrom: undefined,
      updatedTo: undefined,
    });

    expect(apiClient.getLawlist).toHaveBeenCalledWith({
      asof: undefined,
      categoryCd: undefined,
      lawType: undefined,
      limit: 20,
      offset: 0,
      orderNo: 1,
      promulgationDateFrom: undefined,
      promulgationDateTo: undefined,
      updatedFrom: undefined,
      updatedTo: undefined,
    });
    expect(result).toEqual({
      isSuccess: true,
      value: successResponse,
    });
  });

  it("失敗時にエラーを返すべき", async () => {
    const apiClient = {
      getLawlist: vi.fn().mockRejectedValue(new Error("mock error")),
    } as unknown as LawsApiApi;
    vi.spyOn(apiModule, "getApiClient").mockReturnValue(apiClient);

    const result = await getLawList({
      asof: "2022-01-01",
      categoryCd: undefined,
      lawType: undefined,
      orderNo: "1",
      promulgationDateFrom: undefined,
      promulgationDateTo: undefined,
      updatedFrom: undefined,
      updatedTo: undefined,
    });

    expect(apiClient.getLawlist).toHaveBeenCalledWith({
      asof: new Date("2022-01-01"),
      categoryCd: undefined,
      lawType: undefined,
      orderNo: 1,
      limit: 20,
      offset: 0,
      promulgationDateFrom: undefined,
      promulgationDateTo: undefined,
      updatedFrom: undefined,
      updatedTo: undefined,
    });
    expect(result).toEqual({
      isSuccess: false,
      error: new Error("API error: Error: mock error"),
    });
  });

  it("バリデーションエラー時にエラーを返すべき", async () => {
    const result = await getLawList({ page: "0" });

    expect(result).toEqual({
      isSuccess: false,
      error: new Error(
        "ページ番号は1から始まる数字の文字列である必要があります"
      ),
    });
  });
});
