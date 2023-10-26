"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useAsOfFormHooks from "./asof-form-hooks";
import useDateRangeFormHooks from "./date-range-form-hooks";
import { generateHash, getAllSearchParamsAsString } from "@/lib/utils/helper";
import {
  convertToDate,
  formatISOToTokyoDate,
  setTimezoneStartOrEndDayInTokyo,
} from "@/lib/utils/date";
import { DOC_TYPES, LAW_CATEGORIES } from "@/const/common";
import { CategoryCd, LawType } from "@/lib/typescript-fetch";
import useLawTitleHooks from "./law-titles-hooks";
import useLawTypeCheckboxesHooks from "./law-type-checkboxes-hooks";

const useLawListSearchFormHooks = () => {
  // 各フォームのフック
  const lawTitles = useLawTitleHooks();
  const lawTypeCheckbox = useLawTypeCheckboxesHooks<LawType>(DOC_TYPES);
  const categoryCdCheckbox =
    useLawTypeCheckboxesHooks<CategoryCd>(LAW_CATEGORIES);
  const asOfForm = useAsOfFormHooks();
  const promulgationDateForm = useDateRangeFormHooks({
    id: "promulgationDate",
  });
  const updatedDateForm = useDateRangeFormHooks({ id: "updatedDate" });
  const currentSearchParams = useSearchParams();

  const router = useRouter();
  const pathname = usePathname();

  const hasSearchResult = /^\/law-list\/.+/.test(pathname);
  const [isExpand, setIsExpand] = useState(hasSearchResult);

  /**
   * 詳細検索画面フォームの検索実行時処理
   */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urlSearchParams = new URLSearchParams();

    /** 法令名・法令番号 */
    const inputValue = lawTitles.inputValue;
    const selectedForm = lawTitles.selectedForm;
    urlSearchParams.set(selectedForm, inputValue);

    /** 法令種別 */
    const lawTypeCheckboxValues = lawTypeCheckbox.checkedItems;
    const lawTypeValues = Object.keys(lawTypeCheckboxValues)
      .filter((key) => lawTypeCheckboxValues[key])
      .join(",");
    if (lawTypeValues !== "") {
      urlSearchParams.set("lawType", lawTypeValues);
    }

    /** 時点指定 */
    const selectedAsOf = asOfForm.selectedAsOf;
    const targetDate = asOfForm.targetDate;
    const asOfDate = convertToDate(targetDate);
    if (selectedAsOf === "asof" && asOfDate) {
      const asOfDateParam = formatISOToTokyoDate(asOfDate?.toISOString());
      urlSearchParams.set("asof", asOfDateParam);
    }

    /** 公布日範囲 */
    const promulgationDateFrom = promulgationDateForm.targetDateFrom;
    const promulgationDateTo = promulgationDateForm.targetDateTo;

    const promulgationDateFromAsDate = convertToDate(
      promulgationDateFrom.targetDate
    );
    const promulgationDateToAsDate = convertToDate(
      promulgationDateTo.targetDate
    );
    if (promulgationDateFromAsDate !== null) {
      // 公布日範囲の開始日が入力されている場合,yyyy-MM-dd形式の文字列に変換してクエリパラメータに保持
      const promulgationDateFromParam = formatISOToTokyoDate(
        promulgationDateFromAsDate.toISOString()
      );
      urlSearchParams.set("promulgationDateFrom", promulgationDateFromParam);
    }
    if (promulgationDateToAsDate !== null) {
      // 公布日範囲の終了日が入力されている場合,yyyy-MM-dd形式の文字列に変換してクエリパラメータに保持
      const promulgationDateToParam = formatISOToTokyoDate(
        promulgationDateToAsDate.toISOString()
      );
      urlSearchParams.set("promulgationDateTo", promulgationDateToParam);
    }

    /** 検索対象分類 */
    const categoryCdCheckboxValues = categoryCdCheckbox.checkedItems;

    const selectedCategoryCds = Object.keys(categoryCdCheckboxValues)
      .filter((key) => categoryCdCheckboxValues[key])
      .join(",");
    if (selectedCategoryCds !== "") {
      urlSearchParams.set("categoryCd", selectedCategoryCds);
    }

    /** 更新日範囲 */
    const updatedDateFrom = updatedDateForm.targetDateFrom;
    const updatedDateTo = updatedDateForm.targetDateTo;

    const updatedDateFromAsDate = convertToDate(updatedDateFrom.targetDate);
    const updatedDateToAsDate = convertToDate(updatedDateTo.targetDate);
    if (updatedDateFromAsDate !== null) {
      // 開始時はtimezoneを00:00:00にする
      const updatedDateFromStart = setTimezoneStartOrEndDayInTokyo(
        updatedDateFromAsDate,
        "start"
      );
      urlSearchParams.set("updatedFrom", updatedDateFromStart.toISOString());
    }
    if (updatedDateToAsDate !== null) {
      // 終了時はtimezoneを23:59:59にする
      const updatedDateToEnd = setTimezoneStartOrEndDayInTokyo(
        updatedDateToAsDate,
        "end"
      );
      urlSearchParams.set("updatedTo", updatedDateToEnd.toISOString());
    }

    /** ソート順の指定があればクエリパラメータ保持 */
    const sort = currentSearchParams.get("orderNo");
    if (sort !== null) {
      urlSearchParams.set("orderNo", sort);
    }

    // 検索実行時にフォームを閉じる
    setIsExpand(false);

    // 検索クエリパラメータの文字列を作成
    const queryString = getAllSearchParamsAsString(urlSearchParams);
    const hash = generateHash(queryString);
    const urlWithQuery = `/law-list/${hash}?${queryString}`;
    router.push(urlWithQuery, { scroll: false });
    return;
  };

  /** 各フォームを初期値に戻す */
  const onReset = () => {
    lawTitles.onReset();
    lawTypeCheckbox.onReset();
    asOfForm.onReset();
    categoryCdCheckbox.onReset();
    promulgationDateForm.onResetTargetDateFromTo();
    updatedDateForm.onResetTargetDateFromTo();
  };

  return {
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
  };
};

export default useLawListSearchFormHooks;
