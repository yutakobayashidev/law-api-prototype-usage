"use client";
import { InputRadio } from "@/components/elements/input_radio";
import InputForm from "@/components/input-form";
import { TargetDateForm } from "@/hooks/target-date-search-form-hooks";
import { DateFormGroup } from "../date-range-form/date-range-form";

type TargetDateFormGroupProps = {
  id: string;
  targetDateFormValue: TargetDateForm;
  selectedValue: string;
  errorMessage: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeInput: (key: keyof TargetDateForm, value: string | null) => void;
  onBlurGroupParent: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClickCalendarDay: (day: Date) => void;
};

/**
 * 時点検索の日付指定フォーム
 * @returns {JSX.Element} 時点検索の日付指定フォーム
 */
const TargetDateFormGroup = (props: TargetDateFormGroupProps) => {
  const {
    id,
    targetDateFormValue,
    selectedValue,
    errorMessage,
    onClick,
    onChangeInput,
    onBlurGroupParent,
    onClickCalendarDay,
  } = props;

  const disabledDateForm = selectedValue !== "asof";
  return (
    <InputForm>
      <InputForm.Label>時点指定</InputForm.Label>
      <InputForm.HelpText>法令が有効な時点を指定できます</InputForm.HelpText>
      <InputForm.FormBlock>
        {/** ラジオボタン 現行法令 */}
        <InputRadio
          item={{
            id: "currentDate",
            label: "現行法令",
            disabled: false,
            required: true,
          }}
          name={"asof"}
          val={"current"}
          onClick={onClick}
          selectedValue={selectedValue}
        />

        {/** ラジオボタン 時点指定 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2">
          <InputRadio
            item={{
              id: "asof",
              label: "時点指定",
              disabled: false,
              required: true,
            }}
            name={"asof"}
            val={"asof"}
            onClick={onClick}
            selectedValue={selectedValue}
          />
          {/** 日付入力フォーム */}
          <DateFormGroup
            dateFormId={id}
            targetDateForm={targetDateFormValue}
            onChange={onChangeInput}
            disabled={disabledDateForm}
            onBlurGroupParent={onBlurGroupParent}
            onClickCalendarDay={onClickCalendarDay}
          />
        </div>
        <InputForm.ErrorText>{errorMessage}</InputForm.ErrorText>
      </InputForm.FormBlock>
    </InputForm>
  );
};

export default TargetDateFormGroup;
