import { expect, describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useKeywordInputFormHooks from "@/hooks/keyword-input-form-hooks";

describe("useKeywordInputFormHooks", () => {
  it("stateの状態が正しく初期化されること", () => {
    const { result } = renderHook(() => useKeywordInputFormHooks());
    expect(result.current.value).toBe("");
    expect(result.current.error).toBe("");
  });

  it("キーワードの入力時に値が適切に設定されること", () => {
    const { result } = renderHook(() => useKeywordInputFormHooks());
    act(() => {
      result.current.onChangeKeyword({
        currentTarget: { value: "test keyword" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.value).toBe("test keyword");
    expect(result.current.error).toBe("");
  });

  it("フォームのフォーカスが外れたときにエラーメッセージが適切に設定されること", () => {
    const { result } = renderHook(() => useKeywordInputFormHooks());
    act(() => {
      result.current.onBlurKeyword();
    });
    expect(result.current.error).toBe("キーワードの入力は必須です");
  });

  it("フォームがリセットされること", () => {
    const { result } = renderHook(() => useKeywordInputFormHooks());
    act(() => {
      result.current.onChangeKeyword({
        currentTarget: { value: "test keyword" },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    act(() => {
      result.current.onResetForm();
    });
    expect(result.current.value).toBe("");
    expect(result.current.error).toBe("");
  });
});
