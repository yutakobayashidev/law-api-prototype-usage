import { expect, describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useDateRangeFormHooks from "@/hooks/date-range-form-hooks";

const initialState = {
  era: "Reiwa",
  year: null,
  month: null,
  day: null,
};

describe("useDateRangeFormHooks", () => {
  it("onResetTargetDateFromToが呼び出されたときにターゲット日付をリセットするべき", () => {
    const { result } = renderHook(() => useDateRangeFormHooks({ id: "test" }));

    act(() => {
      result.current.targetDateFrom.onChange("year", "3");
      result.current.targetDateTo.onChange("month", "10");
    });

    expect(result.current.targetDateFrom.targetDate).not.toEqual(initialState);
    expect(result.current.targetDateTo.targetDate).not.toEqual(initialState);

    // 今日付をリセットします
    act(() => {
      result.current.onResetTargetDateFromTo();
    });

    expect(result.current.targetDateFrom.targetDate).toEqual(initialState);
    expect(result.current.targetDateTo.targetDate).toEqual(initialState);
  });
});
