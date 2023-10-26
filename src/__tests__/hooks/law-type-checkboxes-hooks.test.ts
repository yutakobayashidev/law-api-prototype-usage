import { expect, describe, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useLawTypeCheckboxesHooks from "@/hooks/law-type-checkboxes-hooks";
import { CheckboxItemType } from "@/types/common";

describe("useLawTypeCheckboxesHooks", () => {
  const checkboxList: CheckboxItemType<string>[] = [
    {
      id: "1",
      name: "name1",
      label: "Label 1",
      disabled: false,
      checked: false,
    },
    {
      id: "2",
      name: "name2",
      label: "Label 2",
      disabled: false,
      checked: true,
    },
  ];

  it("checkedItems の状態が正しく初期化されること", () => {
    const { result } = renderHook(() =>
      useLawTypeCheckboxesHooks(checkboxList)
    );

    expect(result.current.checkedItems).toEqual({
      "1": false,
      "2": true,
    });
  });

  it("チェックボックスの変更が正しく処理されること", () => {
    const { result } = renderHook(() =>
      useLawTypeCheckboxesHooks(checkboxList)
    );

    act(() => {
      result.current.onChangeCheckbox("1", true);
    });

    expect(result.current.checkedItems["1"]).toBe(true);
  });

  it("「全選択」と「全解除」が正しく処理されること", () => {
    const { result } = renderHook(() =>
      useLawTypeCheckboxesHooks(checkboxList)
    );

    act(() => {
      result.current.selectAll();
    });

    expect(result.current.checkedItems).toEqual({
      "1": true,
      "2": true,
    });

    act(() => {
      result.current.deselectAll();
    });

    expect(result.current.checkedItems).toEqual({
      "1": false,
      "2": false,
    });
  });

  it("onReset時に値が初期化されること", () => {
    const { result } = renderHook(() =>
      useLawTypeCheckboxesHooks(checkboxList)
    );

    act(() => {
      result.current.selectAll();
    });

    act(() => {
      result.current.onReset();
    });

    expect(result.current.checkedItems).toEqual({
      "1": false,
      "2": true,
    });
  });
});
