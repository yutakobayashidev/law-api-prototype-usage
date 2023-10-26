import InputForm from "@/components/input-form";
import EraSelectBox from "../common/era-select-box";
import { MonthInput, DayInput, YearInput } from "../common/date-input-form";
import { TargetDateForm } from "@/hooks/target-date-search-form-hooks";
import CalendarIcon from "@/components/icons/calendar-icon";
import { Calendar } from "@/components/ui/calendar";
import useModalToggleHooks from "@/hooks/modal-toggle-hooks";
import { convertToDate } from "@/lib/utils/date";

type TargetDateFormProps = {
  id: string;
  targetDate: TargetDateForm;
  onChange: (key: keyof TargetDateForm, value: string | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onBlurFormGroupParent?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClickCalendarDay?: (day: Date) => void;
};

type DateRangeFormProps = {
  label: string;
  htmlFor: string;
  helpText: string;
  targetDateFrom: TargetDateFormProps;
  targetDateTo: TargetDateFormProps;
  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  errorMessages?: string[];
};

/**
 * 日付範囲指定フォーム(ex. 公布日範囲指定、更新日範囲指定など)
 * @param props
 * @returns
 */
const DateRangeForm = (props: DateRangeFormProps) => {
  const {
    targetDateFrom,
    targetDateTo,
    label,
    helpText,
    onBlur,
    errorMessages = [],
  } = props;

  return (
    <InputForm>
      <InputForm.Label>{label}</InputForm.Label>
      <InputForm.HelpText>{helpText}</InputForm.HelpText>
      <InputForm.FormBlock>
        <div className="flex flex-col gap-4" onBlur={onBlur}>
          {/** from */}
          <DateFormGroup
            targetDateForm={targetDateFrom.targetDate}
            dateFormId={targetDateFrom.id}
            dateRangeText="から"
            onChange={targetDateFrom.onChange}
            onBlurGroupParent={targetDateFrom.onBlurFormGroupParent}
            onClickCalendarDay={targetDateFrom.onClickCalendarDay}
          />
          {/** to */}
          <DateFormGroup
            targetDateForm={targetDateTo.targetDate}
            dateFormId={targetDateTo.id}
            dateRangeText="まで"
            onChange={targetDateTo.onChange}
            onBlurGroupParent={targetDateTo.onBlurFormGroupParent}
            onClickCalendarDay={targetDateTo.onClickCalendarDay}
          />
        </div>
        {errorMessages.length > 0 && (
          <InputForm.ErrorText>
            {errorMessages.map((message, index) => {
              const key = `${message}-${index}`;
              return <div key={key}>{message}</div>;
            })}
          </InputForm.ErrorText>
        )}
      </InputForm.FormBlock>
    </InputForm>
  );
};

export default DateRangeForm;

/**
 * 年号,年,月,日を入力するフォームのProps
 * @param {string} dateRangeText - ~から、~までといった文言が入るテキスト
 */
type DateFormGroupProps = {
  targetDateForm: TargetDateForm;
  dateFormId: string;
  onChange: (key: keyof TargetDateForm, value: string | null) => void;
  dateRangeText?: string;
  disabled?: boolean;
  onBlurGroupParent?: (event: React.FocusEvent<HTMLDivElement>) => void;
  onClickCalendarDay?: (day: Date) => void;
};

/**
 * 年号,年,月,日を入力するフォーム
 * @param props
 * @returns {React.ReactNode} 年号,年,月,日を入力するフォーム
 */
export const DateFormGroup = (props: DateFormGroupProps) => {
  const {
    targetDateForm,
    dateFormId,
    dateRangeText = "",
    disabled = false,
    onChange,
    onBlurGroupParent,
    onClickCalendarDay,
  } = props;

  const datePickerId = `${dateFormId}DatePicker`;

  const { isShow, onClickToggleVisibility } = useModalToggleHooks(
    `#${datePickerId}`
  );

  const targetDate = convertToDate(targetDateForm) ?? new Date();
  return (
    <div className="dateFormGroup relative" onBlur={onBlurGroupParent}>
      <EraSelectBox
        id={dateFormId}
        value={targetDateForm.era}
        onChange={(value) => onChange("era", value)}
        disabled={disabled}
      />
      <YearInput
        id={dateFormId}
        onChange={(value) => onChange("year", value)}
        value={targetDateForm.year ?? ""}
        targetDateFormValue={targetDateForm}
        disabled={disabled}
      />
      <MonthInput
        id={dateFormId}
        onChange={(value) => onChange("month", value)}
        value={targetDateForm.month ?? ""}
        disabled={disabled}
      />
      <DayInput
        id={dateFormId}
        onChange={(value) => onChange("day", value)}
        value={targetDateForm.day ?? ""}
        disabled={disabled}
      />
      {dateRangeText !== "" && <span className="pl-2">{dateRangeText}</span>}
      {/** デートピッカー */}
      <div id={datePickerId} className="flex">
        <button
          type="button"
          disabled={disabled}
          onClick={onClickToggleVisibility}
          aria-label="日付を選択するカレンダーを開く"
        >
          <CalendarIcon disabled={disabled} />
        </button>
        {isShow && (
          <Calendar
            mode="single"
            selectedDate={targetDate}
            onDayClick={onClickCalendarDay}
            className="absolute z-10 -right-2 md:right-1/4 bg-light-Background-Primary border rounded-6xl"
          />
        )}
      </div>
    </div>
  );
};
