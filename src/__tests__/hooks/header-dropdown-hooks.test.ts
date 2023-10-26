import { expect, describe, it, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useHeaderDropdownHooks from "@/hooks/header-dropdown-hooks";

vi.mock("@/hooks/modal-toggle-hooks", async () => {
  const actual = await vi.importActual<{
    isShow: boolean;
    onClickToggleVisibility: () => void;
  }>("@/hooks/modal-toggle-hooks");
  return {
    ...actual,
    useModalToggleHooks: () => ({
      isShow: true,
      onToggle: vi.fn(),
    }),
  };
});

vi.mock("next/navigation", () => {
  return {
    usePathname: () => "/keyword",
  };
});

describe("useHeaderDropdownHooks", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("ヘッダーのヘルプリンクのURLが正しいこと", () => {
    const { result } = renderHook(() => useHeaderDropdownHooks());

    act(() => {
      // モーダルを表示する
      result.current.onClickToggleVisibility();
    });

    expect(result.current.swaggerUiUrl).toEqual({
      url: `${process.env.NEXT_PUBLIC_API_SPECIFICATION_URL}`,
      title: "API 仕様書",
      label: "API 仕様書(Swagger UI)",
    });
    expect(result.current.isShow).toBe(true);
  });
});
