import { expect, describe, it, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useLawlistSearchFormHooks from "@/hooks/lawlist-search-form-hooks";
import { initCheckedItems, updateCheckboxItems } from "@/lib/utils/helper";
import { DOC_TYPES, LAW_CATEGORIES } from "@/const/common";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: () => "/law-list/result/test",
}));

describe("useLawlistSearchFormHooks", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("検索結果表示時、pathnameが/law-list/result/**の場合はhasSearchResultがtrueであること", () => {
    const { result } = renderHook(() => useLawlistSearchFormHooks());
    expect(result.current.hasSearchResult).toBe(true);
  });

  it("キーワード検索フォームフックのリセット", () => {
    const { result } = renderHook(useLawlistSearchFormHooks);
    act(() => {
      // 法令名 or 法令番号 input
      result.current.lawTitles.onClickRadio({
        currentTarget: { value: "lawNum" },
      } as React.MouseEvent<HTMLButtonElement>);
      // 法令種別
      result.current.lawTypeCheckbox.deselectAll();
      // 時点指定
      result.current.asOfForm.onChangeSelectedAsOf({
        currentTarget: { value: "asof" },
      } as React.MouseEvent<HTMLButtonElement>);
      // 公布日範囲
      result.current.promulgationDateForm.targetDateFrom.onChange("year", "3");
      // 検索対象分類
      result.current.categoryCdCheckbox.deselectAll();
      // 更新日範囲
      result.current.updatedDateForm.targetDateFrom.onChange("year", "3");
    });

    /**デフォルト値ではなく入力された値であること */
    expect(result.current.lawTitles.selectedForm).toBe("lawNum");
    const deselectAllCategories = updateCheckboxItems({
      checkboxList: LAW_CATEGORIES,
      isSelected: false,
    });
    expect(result.current.categoryCdCheckbox.checkedItems).toEqual(
      deselectAllCategories
    );
    expect(result.current.asOfForm.selectedAsOf).toBe("asof");
    expect(
      result.current.promulgationDateForm.targetDateFrom.targetDate
    ).toEqual({
      era: "Reiwa",
      year: "3",
      month: null,
      day: null,
    });
    const deselectAllDocTypes = updateCheckboxItems({
      checkboxList: DOC_TYPES,
      isSelected: false,
    });
    expect(result.current.lawTypeCheckbox.checkedItems).toEqual(
      deselectAllDocTypes
    );
    expect(result.current.updatedDateForm.targetDateFrom.targetDate).toEqual({
      era: "Reiwa",
      year: "3",
      month: null,
      day: null,
    });

    act(() => {
      result.current.onReset();
    });

    // 全てのフォームがデフォルト値に戻っていること
    expect(result.current.lawTitles.selectedForm).toBe("lawTitle");
    const initialLawTypeCheckbox = initCheckedItems(DOC_TYPES);
    expect(result.current.lawTypeCheckbox.checkedItems).toEqual(
      initialLawTypeCheckbox
    );
    expect(result.current.asOfForm.selectedAsOf).toBe("current");
    expect(
      result.current.promulgationDateForm.targetDateFrom.targetDate
    ).toEqual({
      era: "Reiwa",
      year: null,
      month: null,
      day: null,
    });
    const initialCategoryCdCheckbox = initCheckedItems(LAW_CATEGORIES);
    expect(result.current.categoryCdCheckbox.checkedItems).toEqual(
      initialCategoryCdCheckbox
    );
    expect(result.current.updatedDateForm.targetDateFrom.targetDate).toEqual({
      era: "Reiwa",
      year: null,
      month: null,
      day: null,
    });
  });
});
