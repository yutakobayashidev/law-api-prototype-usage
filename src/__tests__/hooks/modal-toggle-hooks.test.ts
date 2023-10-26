import { expect, describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useModalToggleHooks from "@/hooks/modal-toggle-hooks";

describe("useModalToggleHooks", () => {
  it("初期状態で isShow は false であるべき", () => {
    const { result } = renderHook(() => useModalToggleHooks("#testElement"));

    expect(result.current.isShow).toBe(false);
  });

  it("onClickToggleVisibility が呼び出されたときに isShow をトグルするべき", () => {
    const { result } = renderHook(() => useModalToggleHooks("#testElement"));

    act(() => {
      result.current.onClickToggleVisibility();
    });

    expect(result.current.isShow).toBe(true);

    act(() => {
      result.current.onClickToggleVisibility();
    });

    expect(result.current.isShow).toBe(false);
  });
});
