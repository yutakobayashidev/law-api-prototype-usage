"use client";
import Button from "../elements/button";
import TargetDateForm from "./target-date-form/target-date-form";
import TextFormGroup from "./text-form-group/law-name-form";
import useKeywordSearchFormHooks from "@/hooks/keyword-search-form-hooks";

/**
 * キーワード検索を行うフォーム群
 * @returns {React.ReactNode} キーワード検索を行うフォーム群
 */
const KeywordSearchFormGroup = () => {
  const {
    keywordInput,
    asOfForm,
    hasSearchResult,
    isExpand,
    onSubmit,
    onResetForm,
    setIsExpand,
  } = useKeywordSearchFormHooks();

  if (hasSearchResult && !isExpand)
    return (
      <div className="py-4">
        <Button
          type="button"
          label="検索条件をすべて表示"
          className="bg-light-Background-Tertiary w-full col-span-8"
          onClick={() => setIsExpand(true)}
        >
          検索条件をすべて表示
        </Button>
      </div>
    );

  return (
    <form className="grid grid-cols-8 gap-4" onSubmit={onSubmit}>
      <div className="col-span-8">
        <div className="pt-7 pb-7 flex flex-col gap-7">
          {/** キーワード 入力フォーム*/}
          <TextFormGroup
            id="keyword"
            name="keyword"
            label="キーワード"
            htmlFor="keyword"
            helpText="単一のキーワードで全文検索ができます"
            placeholder="検索したいキーワードを入力"
            onChange={keywordInput.onChangeKeyword}
            onBlur={keywordInput.onBlurKeyword}
            value={keywordInput.value}
            error={keywordInput.error}
          />
          {/** 時点指定 */}
          <TargetDateForm
            id={asOfForm.id}
            targetDateFormValue={asOfForm.targetDate}
            selectedValue={asOfForm.selectedAsOf}
            errorMessage={asOfForm.errorMessage}
            onClick={asOfForm.onChangeSelectedAsOf}
            onChangeInput={asOfForm.onChangeInputDate}
            onBlurGroupParent={asOfForm.onBlurFormGroupParent}
            onClickCalendarDay={asOfForm.onClickCalendarDay}
          />
        </div>
      </div>
      {/** 検索ボタン */}
      <div className="col-span-8 flex flex-col-reverse md:grid md:grid-cols-2 gap-4">
        <Button
          type="button"
          label="検索条件をリセット"
          className="w-full md:w-auto secondary"
          onClick={onResetForm}
        />
        <Button
          type="submit"
          label="法令を検索"
          className="w-full md:w-auto primary"
        >
          検索
        </Button>
      </div>
      {hasSearchResult && (
        <Button
          type="button"
          label="検索条件を閉じる"
          className=" bg-light-Background-Tertiary w-full col-span-8"
          onClick={() => setIsExpand(false)}
        />
      )}
    </form>
  );
};

export default KeywordSearchFormGroup;
