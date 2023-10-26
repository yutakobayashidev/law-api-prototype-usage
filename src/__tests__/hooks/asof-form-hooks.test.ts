import { expect, describe, it, vi, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useAsOfFormHooks from "@/hooks/asof-form-hooks";

vi.mock("@/hooks/target-date-search-form-hooks", async () => {
  const actual = await vi.importActual<{
    id: string;
    targetDate: string;
    errorMessage: string;
    onChange: () => void;
    onBlurFormGroupParent: () => void;
    onClickCalendarDay: () => void;
    resetTargetDate: () => void;
  }>("@/hooks/target-date-search-form-hooks");
  return {
    ...actual,
    useDateSearchFormHooks: () => ({
      id: "asof",
      targetDate: "2021-01-01",
      errorMessage: "error",
      onChange: vi.fn(),
      onBlurFormGroupParent: vi.fn(),
      onClickCalendarDay: vi.fn(),
      resetTargetDate: vi.fn(),
    }),
  };
});

describe("useAsOfFormHooks", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('初期状態で selectedAsOf は "current" であるべき', () => {
    const { result } = renderHook(() => useAsOfFormHooks());

    expect(result.current.selectedAsOf).toBe("current");
  });

  it("onChangeSelectedAsOf が呼ばれたときに selectedAsOf の値が変更されるべき", () => {
    const { result } = renderHook(() => useAsOfFormHooks());

    act(() => {
      result.current.onChangeSelectedAsOf({
        currentTarget: { value: "asof" },
      } as React.MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.selectedAsOf).toBe("asof");
  });

  it("onReset が呼ばれたときに selectedAsOf の値がリセットされるべき", () => {
    const { result } = renderHook(() => useAsOfFormHooks());

    act(() => {
      result.current.onReset();
    });

    expect(result.current.selectedAsOf).toBe("current");
  });

  it('selectedAsOf が "asof" のときに errorMessage が設定されるべき', async () => {
    const { result } = renderHook(() => useAsOfFormHooks());

    act(() => {
      result.current.onChangeSelectedAsOf({
        currentTarget: { value: "asof" },
      } as React.MouseEvent<HTMLButtonElement>);

      result.current.onChangeInputDate("year", "100");
    });

    await waitFor(() => {
      act(() => {
        result.current.onBlurFormGroupParent({
          currentTarget: { contains: vi.fn(() => false) },
          relatedTarget: { contains: vi.fn(() => true) },
        } as unknown as React.FocusEvent<HTMLDivElement>);
      });
    });

    expect(result.current.errorMessage).not.toBe("");
  });
});
