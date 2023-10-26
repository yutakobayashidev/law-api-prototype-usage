"use client";
import useLawListSearchFormHooks from "@/hooks/lawlist-search-form-hooks";
import DateRangeForm from "./date-range-form/date-range-form";
import TargetDateForm from "./target-date-form/target-date-form";
import { LawTitleOrNumberSearchForm } from "./text-form-group/law-name-form";
import Button from "../elements/button";
import CheckboxesForm from "./law-categories/law-categories-checkboxes";
import { DOC_TYPES, LAW_CATEGORIES } from "@/const/common";

/**
 * 詳細検索、更新日法令一覧の検索条件のフォーム群
 * @returns {React.ReactNode}
 */
export const LawListSearchFormGroup = () => {
  const {
    lawTitles,
    lawTypeCheckbox,
    asOfForm,
    promulgationDateForm,
    updatedDateForm,
    categoryCdCheckbox,
    hasSearchResult,
    isExpand,
    onSubmit,
    onReset,
    setIsExpand,
  } = useLawListSearchFormHooks();

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
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <div className="pt-7 pb-7 flex flex-col gap-7">
        {/** 法令名・法令番号 入力フォーム */}
        <LawTitleOrNumberSearchForm
          id="lawName"
          name="lawName"
          label="法令名"
          htmlFor="lawName"
          helpText={lawTitles.helpText}
          placeholder={lawTitles.placeHolder}
          value={lawTitles.inputValue}
          selectedValue={lawTitles.selectedForm}
          onClickRadio={lawTitles.onClickRadio}
          onChangeInput={lawTitles.onChangeInput}
        />
        {/** 法令種別 選択チェックボックス */}
        <CheckboxesForm
          label="法令種別"
          helpText="検索対象にする法令種別を選択できます"
          htmlFor="docType"
          items={DOC_TYPES}
          checkedItems={lawTypeCheckbox.checkedItems}
          onChangeCheckbox={lawTypeCheckbox.onChangeCheckbox}
          onClickSelectAllItems={lawTypeCheckbox.selectAll}
          onClickDeselectAllItems={lawTypeCheckbox.deselectAll}
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
        {/** 公布日範囲指定 */}
        <DateRangeForm
          label="公布日範囲指定"
          htmlFor="promulgationDate"
          helpText="法令の公布日の範囲を指定できます"
          targetDateFrom={promulgationDateForm.targetDateFrom}
          targetDateTo={promulgationDateForm.targetDateTo}
          errorMessages={promulgationDateForm.errorMessages}
          onBlur={promulgationDateForm.onBlurDateRangeForm}
        />
        {/** 検索対象分類 チェックボックス*/}
        <CheckboxesForm
          label="検索対象の分類"
          helpText="検索対象にする法令分類を選択できます"
          htmlFor="lawCategories"
          items={LAW_CATEGORIES}
          checkedItems={categoryCdCheckbox.checkedItems}
          onChangeCheckbox={categoryCdCheckbox.onChangeCheckbox}
          onClickSelectAllItems={categoryCdCheckbox.selectAll}
          onClickDeselectAllItems={categoryCdCheckbox.deselectAll}
        />
        {/** 更新日範囲指定 */}
        <DateRangeForm
          label="更新日範囲指定"
          htmlFor="updatedDate"
          helpText="データの更新日の範囲を指定できます"
          targetDateFrom={updatedDateForm.targetDateFrom}
          targetDateTo={updatedDateForm.targetDateTo}
          errorMessages={updatedDateForm.errorMessages}
          onBlur={updatedDateForm.onBlurDateRangeForm}
        />
      </div>
      {/** 検索・条件リセットボタン */}
      <div className="col-span-8 flex flex-col-reverse md:grid md:grid-cols-2 gap-4">
        <Button
          type="button"
          label="検索条件をリセット"
          className="w-full md:w-auto secondary"
          onClick={onReset}
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
