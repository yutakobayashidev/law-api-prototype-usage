import { useState } from "react";
import useTargetDateSearchFormHooks from "./target-date-search-form-hooks";

type AsOfForm = "asof" | "current";

/**
 * 時点指定フォームのHooks
 * @returns
 */
const useAsOfFormHooks = () => {
  const [selectedAsOf, setSelectedAsOf] = useState<AsOfForm>("current"); // 時点指定の選択値
  const {
    id,
    targetDate,
    errorMessage,
    onChange,
    onBlurFormGroupParent,
    onClickCalendarDay,
    resetTargetDate,
  } = useTargetDateSearchFormHooks({ id: "asof" });

  /**
   * 時点指定入力時の処理
   */
  const onChangeSelectedAsOf = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedAsOf: AsOfForm = event.currentTarget.value as AsOfForm;
    setSelectedAsOf(selectedAsOf);
  };

  /**
   * フォームの入力内容のリセット、クリア
   */
  const onReset = () => {
    resetTargetDate();
    setSelectedAsOf("current");
  };

  const asOfErrorMessage = selectedAsOf === "asof" ? errorMessage : "";

  return {
    id,
    selectedAsOf,
    setSelectedAsOf,
    targetDate,
    errorMessage: asOfErrorMessage,
    onChangeInputDate: onChange,
    resetTargetDate,
    onChangeSelectedAsOf,
    onBlurFormGroupParent,
    onClickCalendarDay,
    onReset,
  };
};

export default useAsOfFormHooks;
