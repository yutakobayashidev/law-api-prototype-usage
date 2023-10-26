import { expect, describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useLawTitleHooks from "@/hooks/law-titles-hooks";

describe("useLawTitleHooks", () => {
  it("初期値が正しく設定されていること", () => {
    const { result } = renderHook(() => useLawTitleHooks());

    expect(result.current.selectedForm).toBe("lawTitle");
    expect(result.current.inputValue).toBe("");
    expect(result.current.placeHolder).toBe("検索したい法令名を入力(部分一致)");
    expect(result.current.helpText).toBe(
      "法令名または法令番号を選択し検索できます"
    );
  });

  it("ラジオボタンクリック時にselectedFormが更新されること", () => {
    const { result } = renderHook(() => useLawTitleHooks());

    act(() => {
      result.current.onClickRadio({
        currentTarget: { value: "lawNum" },
      } as React.MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.selectedForm).toBe("lawNum");
    expect(result.current.placeHolder).toBe(
      "検索したい法令番号を入力(完全一致)"
    );
  });

  it("入力変更時にinput Valueが更新されること", () => {
    const { result } = renderHook(() => useLawTitleHooks());

    act(() => {
      result.current.onChangeInput({
        currentTarget: { value: "test input" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.inputValue).toBe("test input");
  });

  it("onReset実行時に値がResetされること", () => {
    const { result } = renderHook(() => useLawTitleHooks());

    act(() => {
      result.current.onChangeInput({
        currentTarget: { value: "test input" },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.onClickRadio({
        currentTarget: { value: "lawNum" },
      } as React.MouseEvent<HTMLButtonElement>);
    });

    act(() => {
      result.current.onReset();
    });

    expect(result.current.selectedForm).toBe("lawTitle");
    expect(result.current.inputValue).toBe("");
  });
});
