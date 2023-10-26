import { useState } from "react";

const LAW_NAME_FORM_PROPERTIES = {
  lawTitle: {
    placeHolder: "検索したい法令名を入力(部分一致)",
  },
  lawNum: {
    placeHolder: "検索したい法令番号を入力(完全一致)",
  },
};

const useLawTitleHooks = () => {
  // lawTitle Or lawNumber
  const [selectedForm, setSelectedForm] = useState<"lawTitle" | "lawNum">(
    "lawTitle"
  );
  const [inputValue, setInputValue] = useState("");

  /**
   * 法令名or法令番号を検索パラメータとして選択する際のラジオボタンの変更イベント
   * @param event
   */
  const onClickRadio = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedForm = event.currentTarget.value as "lawTitle" | "lawNum";

    setSelectedForm(selectedForm);
  };

  /**
   * 法令名or法令番号の入力フォームの変更イベント
   * @param event
   */
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    setInputValue(inputValue);
  };

  /** stateを初期化する関数 */
  const onReset = () => {
    setInputValue("");
    setSelectedForm("lawTitle");
  };

  /** 入力フォームのプレースホルダー */
  const placeHolder = LAW_NAME_FORM_PROPERTIES[selectedForm].placeHolder;

  /** 入力フォームのヘルプテキスト */
  const helpText = "法令名または法令番号を選択し検索できます";

  return {
    inputValue,
    selectedForm,
    placeHolder,
    helpText,
    onChangeInput,
    onClickRadio,
    onReset,
  };
};

export default useLawTitleHooks;
