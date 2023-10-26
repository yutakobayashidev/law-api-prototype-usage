import { expect, describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useTargetDateSearchFormHooks from "@/hooks/target-date-search-form-hooks";

const initialState = {
  era: "Reiwa",
  year: null,
  month: null,
  day: null,
};

describe("useTargetDateSearchFormHooks", () => {
  it("初期値が正しく設定されていること", () => {
    const { result } = renderHook(() =>
      useTargetDateSearchFormHooks({ id: "test" })
    );
    expect(result.current.targetDate).toEqual(initialState);
    expect(result.current.errorMessage).toBe("");
  });

  it("入力した年の日付が正しく変更されること", () => {
    const { result } = renderHook(() =>
      useTargetDateSearchFormHooks({ id: "test" })
    );

    act(() => {
      result.current.onChange("era", "Heisei");
    });

    expect(result.current.targetDate.era).toBe("Heisei");
  });

  it("入力した年の日付が正しく変更されること", () => {
    const { result } = renderHook(() =>
      useTargetDateSearchFormHooks({ id: "test" })
    );

    act(() => {
      result.current.onChange("year", "3");
    });

    expect(result.current.targetDate.year).toBe("3");
  });

  it("4桁の数値の入力時はnullになること", () => {
    const { result } = renderHook(() =>
      useTargetDateSearchFormHooks({ id: "test" })
    );

    act(() => {
      result.current.onChange("year", "2023");
    });

    expect(result.current.targetDate.year).toBe(null);
  });

  it("カレンダーの日付を更新した際に日付が正しく変更されること", () => {
    const { result } = renderHook(() =>
      useTargetDateSearchFormHooks({ id: "test" })
    );
    const testDate = new Date(2023, 8, 26);

    act(() => {
      result.current.onClickCalendarDay(testDate);
    });

    // 令和"5"年""9"月"26"日
    expect(result.current.targetDate.year).toBe("5");
    expect(result.current.targetDate.month).toBe("9");
    expect(result.current.targetDate.day).toBe("26");
  });

  it("カレンダーの日付を更新した際に日付が正しく変更されること", () => {
    const { result } = renderHook(() =>
      useTargetDateSearchFormHooks({ id: "test" })
    );
    const testDate = new Date(1970, 0, 1);

    act(() => {
      result.current.onClickCalendarDay(testDate);
    });

    // 昭和"45"年"1"月"1"日
    expect(result.current.targetDate.era).toBe("Showa");
    expect(result.current.targetDate.year).toBe("45");
    expect(result.current.targetDate.month).toBe("1");
    expect(result.current.targetDate.day).toBe("1");
  });

  it("指定中の日付がリセットされること", () => {
    const { result } = renderHook(() =>
      useTargetDateSearchFormHooks({ id: "test" })
    );

    act(() => {
      result.current.resetTargetDate();
    });

    expect(result.current.targetDate).toEqual(initialState);
  });
});
