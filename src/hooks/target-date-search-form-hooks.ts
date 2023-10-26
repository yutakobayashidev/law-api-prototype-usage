import { Era } from "@/lib/typescript-fetch";
import {
  getEraAndEraYear,
  isCompleteDateForm,
  isFullySpecifiedOrEmptyDate,
  isValidJapaneseDateField,
} from "@/lib/utils/date";
import { useEffect, useState } from "react";

const initialState: TargetDateForm = {
  era: "Reiwa",
  year: null,
  month: null,
  day: null,
};

export type TargetDateForm = {
  era: Era;
  year: string | null;
  month: string | null;
  day: string | null;
};

/**
 * 時点指定等の日付入力を行うフォームのHooks
 * @returns
 */
const useTargetDateSearchFormHooks = ({
  id,
  disabled = false,
  formName = "",
}: {
  id: string;
  disabled?: boolean;
  formName?: string;
}) => {
  const [targetDate, setTargetDate] = useState<TargetDateForm>(initialState); // 日付
  const [errorMessage, setErrorMessage] = useState<string>(""); // エラーメッセージ
  const [, setIsFocused] = useState<boolean>(false); // フォーカス状態

  /**
   * 日付入力フォームの入力値が変更されたときに呼び出されるコールバック関数です。
   * @param key - TargetDateFormオブジェクトのプロパティ名を表す文字列型のキー
   * @param value - 入力された値を表す文字列型の値またはnull
   */
  const onChangeInputDate = (
    key: keyof TargetDateForm,
    value: string | null
  ) => {
    const isValue = isValidJapaneseDateField(targetDate, key, value);
    if (!isValue) {
      return;
    }
    const newValue = {
      ...targetDate,
      [key]: value,
    };
    if (isCompleteDateForm(newValue)) {
      setErrorMessage("");
    }

    setTargetDate({
      ...targetDate,
      [key]: value,
    });
  };

  const onClickCalendarDay = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // 年号をyear,month,dayから求める
    const { era, eraYear } = getEraAndEraYear(year, month, day);

    setTargetDate({
      era: era,
      year: eraYear,
      month: month.toString(),
      day: day.toString(),
    });
  };

  /**
   * Formの親要素からフォーカスが外れた時の処理
   * @param event
   */
  const onBlurFormGroupParent = (event: React.FocusEvent<HTMLDivElement>) => {
    const isContainFocusedChild = event.currentTarget.contains(
      event.relatedTarget as Node
    );

    // もしイベントが各Formの親から発生した場合のみ onBlur を呼び出す
    if (!isContainFocusedChild) {
      setIsFocused(false);
      // 年月日が全て指定されているか、未指定であるか場合はエラーを表示しない
      if (!isFullySpecifiedOrEmptyDate(targetDate)) {
        setErrorMessage(`${formName}日付を全て入力してください。`);
        return;
      }
      setErrorMessage("");
    }
  };

  /**
   * Stateの初期化
   */
  const resetTargetDate = () => {
    setTargetDate(initialState);
  };

  useEffect(() => {
    if (disabled) {
      resetTargetDate();
    }
  }, [disabled]);

  return {
    id: `${id}DateForm`,
    targetDate,
    errorMessage,
    onChange: onChangeInputDate,
    onBlurFormGroupParent,
    onClickCalendarDay,
    resetTargetDate,
  };
};

export default useTargetDateSearchFormHooks;
