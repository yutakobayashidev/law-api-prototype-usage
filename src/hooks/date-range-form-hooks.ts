import { convertToDate } from "@/lib/utils/date";
import useTargetDateSearchFormHooks from "./target-date-search-form-hooks";
import { useEffect, useState } from "react";

const useDateRangeFormHooks = ({ id }: { id: string }) => {
  const [dateRangeError, setDateRangeError] = useState<string[]>([]); // エラーメッセージ

  const targetDateFrom = useTargetDateSearchFormHooks({
    id: `${id}From`,
    formName: "from",
  });
  const targetDateTo = useTargetDateSearchFormHooks({
    id: `${id}To`,
    formName: "to",
  });

  const onResetTargetDateFromTo = () => {
    targetDateFrom.resetTargetDate();
    targetDateTo.resetTargetDate();
  };

  const onBlurDateRangeForm = (event: React.FocusEvent<HTMLDivElement>) => {
    const isContainFocusedChild = event.currentTarget.contains(
      event.relatedTarget as Node
    );

    // もしイベントがFrom,ToのFormの親から発生した場合のみ onBlur を呼び出す
    if (
      !isContainFocusedChild &&
      targetDateFrom.errorMessage === "" &&
      targetDateTo.errorMessage === ""
    ) {
      // fromとtoの値のチェック
      const from = convertToDate(targetDateFrom.targetDate);
      const to = convertToDate(targetDateTo.targetDate);
      if (from && to && from > to) {
        setDateRangeError(["開始日は終了日より前の日付を指定してください"]);
        return;
      }
      setDateRangeError([]);
    }
  };

  useEffect(() => {
    const newDateRangeError = [
      targetDateFrom.errorMessage,
      targetDateTo.errorMessage,
    ].filter((errorMessage) => errorMessage !== "");

    setDateRangeError(newDateRangeError);
  }, [targetDateFrom.errorMessage, targetDateTo.errorMessage]);

  return {
    targetDateFrom,
    targetDateTo,
    errorMessages: dateRangeError,
    onResetTargetDateFromTo,
    onBlurDateRangeForm,
  };
};

export default useDateRangeFormHooks;
