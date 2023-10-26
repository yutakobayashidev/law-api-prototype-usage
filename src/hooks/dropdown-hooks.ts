import { generateHash, getAllSearchParamsAsString } from "@/lib/utils/helper";
import { DropdownMenuType } from "@/types/common";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const useDropdownHooks = (items: DropdownMenuType[]) => {
  const currentSearchParams = useSearchParams();
  const selectedSortParam = currentSearchParams.get("orderNo");
  const selectedSortItem =
    items.find((item) => String(item.value) === selectedSortParam) ?? items[0];
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState(selectedSortItem);
  const pathname = usePathname();
  const router = useRouter();

  /**
   * ドロップダウン表示切替
   */
  const toggleDropdown = () => {
    setIsShowDropDown(!isShowDropDown);
  };

  /**
   * 範囲外選択時選択フォーム閉じる処理
   * @param event マウスイベント
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setIsShowDropDown(false);
    }
  };

  /**
   * ソート順の変更処理
   */
  const onChangeResultSort = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const value = event.currentTarget.value;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("orderNo", value.toString());
    searchParams.delete("page");
    const query = getAllSearchParamsAsString(searchParams);
    const hash = generateHash(query);
    const newPathname = pathname.replace(/\/([^/]+)\/(.+)$/, `/$1/${hash}`);

    setSelectedSort(
      items.find((item) => String(item.value) === value) || items[0]
    );

    setIsShowDropDown(!isShowDropDown);

    router.push(`${newPathname}?${query}`, {
      scroll: false,
    });
  };

  return {
    selectedSort,
    isShowDropDown,
    toggleDropdown,
    dismissHandler,
    onChangeResultSort,
  };
};

export default useDropdownHooks;
