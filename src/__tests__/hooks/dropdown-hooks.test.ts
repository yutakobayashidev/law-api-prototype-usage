import { expect, describe, it, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { DropdownMenuType } from "@/types/common";
import useDropdownHooks from "@/hooks/dropdown-hooks";

vi.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: vi.fn(() => null),
    }),
    useSearchParams: () => ({
      get: vi.fn(() => null),
    }),
    usePathname: () => "/keyword/result",
  };
});

const mockItems: DropdownMenuType[] = [
  { value: 1, label: "Item 1" },
  { value: 2, label: "Item 2" },
];

describe("useDropdownHooks", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("ドロップダウンの表示と非表示を切り替える", () => {
    const { result } = renderHook(() => useDropdownHooks(mockItems));

    // 初期状態ではドロップダウンは非表示であることを確認する
    expect(result.current.isShowDropDown).toBe(false);

    // toggleDropdown を呼び出してドロップダウンを表示する
    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isShowDropDown).toBe(true);

    // toggleDropdown をもう一度呼び出してドロップダウンを非表示にする
    act(() => {
      result.current.toggleDropdown();
    });
    expect(result.current.isShowDropDown).toBe(false);
  });
});
