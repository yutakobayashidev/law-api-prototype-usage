import { expect, describe, it, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useKeywordSearchFormHooks from "@/hooks/keyword-search-form-hooks";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: () => "/keyword/result/test",
}));

describe("useKeywordSearchFormHooks", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("検索結果表示時、pathnameが/keyword/result/**の場合はhasSearchResultがtrueであること", () => {
    const { result } = renderHook(() => useKeywordSearchFormHooks());
    expect(result.current.hasSearchResult).toBe(true);
  });

  it("キーワード検索フォームフックのリセット", () => {
    const { result } = renderHook(useKeywordSearchFormHooks);
    act(() => {
      result.current.keywordInput.onChangeKeyword({
        currentTarget: { value: "test keyword" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.asOfForm.onChangeSelectedAsOf({
        currentTarget: { value: "asof" },
      } as React.MouseEvent<HTMLButtonElement>);
    });

    // デフォルト値ではなく入力された値であること
    expect(result.current.keywordInput.value).toBe("test keyword");
    expect(result.current.asOfForm.selectedAsOf).toBe("asof");

    act(() => {
      result.current.onResetForm();
    });

    // デフォルト値に戻っていること
    expect(result.current.keywordInput.value).toBe("");
    expect(result.current.asOfForm.selectedAsOf).toBe("current");
  });
});
