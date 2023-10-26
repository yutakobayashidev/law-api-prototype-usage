import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  convertToDate,
  formatISOToTokyoDate,
  isCompleteDateForm,
} from "@/lib/utils/date";
import { getAllSearchParamsAsString, generateHash } from "@/lib/utils/helper";
import useKeywordInputFormHooks from "./keyword-input-form-hooks";
import useAsOfFormHooks from "./asof-form-hooks";
import { useState } from "react";

const useKeywordSearchFormHooks = () => {
  // 検索キーワードの入力フォームのフック
  const keywordInput = useKeywordInputFormHooks();
  const asOfForm = useAsOfFormHooks();

  const currentSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const hasSearchResult = /^\/keyword\/.+/.test(pathname);
  const [isExpand, setIsExpand] = useState(hasSearchResult);

  /**
   * フォームの入力内容のリセット、クリア
   */
  const onResetForm = () => {
    asOfForm.onReset();
    keywordInput.onResetForm();
  };

  /**
   * 検索実行時の処理
   */
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const urlSearchParams = new URLSearchParams();

    // 検索キーワードをセット
    urlSearchParams.set("keyword", keywordInput.value);

    // 時点指定の選択時が"asof"の場合、時点指定をセット
    const isCompleteDate = isCompleteDateForm(asOfForm.targetDate);
    if (asOfForm.selectedAsOf === "asof") {
      const asOfDate = convertToDate(asOfForm.targetDate);
      // era, year, month, dayが全て入力されている場合はasofパラメータに値をセット
      if (isCompleteDate && asOfDate) {
        const asOfDateParam = formatISOToTokyoDate(asOfDate.toISOString());
        urlSearchParams.set("asof", asOfDateParam);
      }
    }

    // ソート順の指定があればクエリパラメータ保持
    const sort = currentSearchParams.get("orderNo");
    if (sort !== null) {
      urlSearchParams.set("orderNo", sort);
    }

    // 検索実行時にフォームを閉じる
    setIsExpand(false);

    const queryString = getAllSearchParamsAsString(urlSearchParams);
    const hash = generateHash(queryString);
    const urlWithQuery = `/keyword/${hash}?${queryString}`;
    router.push(urlWithQuery, { scroll: false });
  };

  return {
    keywordInput,
    asOfForm,
    hasSearchResult,
    isExpand,
    onSubmit,
    onResetForm,
    setIsExpand,
  };
};

export default useKeywordSearchFormHooks;
