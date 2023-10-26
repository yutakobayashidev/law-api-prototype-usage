import { initCheckedItems, updateCheckboxItems } from "@/lib/utils/helper";
import { CheckboxItemType } from "@/types/common";
import { useState } from "react";

/**
 * 法令種別チェックボックスのHooks
 * @returns {Object} 法令種別チェックボックスのHooks
 * @property {Record<string, boolean>} checkedItems - チェックボックスのチェック状態
 * @property {(id: string, checked: boolean) => void} onChangeCheckbox - チェックボックスのチェック状態を変更する関数
 */
export const useLawTypeCheckboxesHooks = <T>(
  checkboxList: CheckboxItemType<T>[]
) => {
  const initialCheckedItems = initCheckedItems(checkboxList);
  const [checkedItems, setCheckedItems] =
    useState<Record<string, boolean>>(initialCheckedItems);

  /** チェックボックスを選択した際のイベント */
  const onChangeCheckbox = (id: string, checked: boolean) => {
    setCheckedItems({ ...checkedItems, [id]: checked });
  };

  /**
   * チェックボックスの全選択または全解除をする関数
   */
  const setAllCheckboxes = (isSelected: boolean) => {
    const newCheckedItems = updateCheckboxItems({
      checkboxList,
      isSelected,
    });
    setCheckedItems(newCheckedItems);
  };

  const selectAll = () => setAllCheckboxes(true);
  const deselectAll = () => setAllCheckboxes(false);

  /** stateを初期化する関数 */
  const onReset = () => setCheckedItems(initialCheckedItems);

  return {
    checkedItems,
    onChangeCheckbox,
    selectAll,
    deselectAll,
    onReset,
  };
};

export default useLawTypeCheckboxesHooks;
