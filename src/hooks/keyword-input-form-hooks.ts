import { useState } from "react";

const useKeywordInputFormHooks = () => {
  const [value, setValue] = useState<string>(""); // 検索キーワード
  const [error, setError] = useState<string>(""); // エラー
  /**
   * キーワード入力時の処理
   */
  const onChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    if (event.currentTarget.value) {
      setError("");
    }
  };

  /**
   * 入力フォームからフォーカスが外れた際の処理
   */
  const onBlurKeyword = () => {
    if (!value) {
      setError("キーワードの入力は必須です");
    }
  };

  const onResetForm = () => {
    setError("");
    setValue("");
  };

  return {
    value,
    error,
    onChangeKeyword,
    onBlurKeyword,
    onResetForm,
  };
};

export default useKeywordInputFormHooks;
