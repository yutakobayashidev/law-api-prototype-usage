"use client";

import { TargetDateForm } from "@/hooks/target-date-search-form-hooks";
import { Era } from "@/lib/typescript-fetch";

/**
 * 日付入力コンポーネントのProps
 * @typedef {Object} DateInputProps
 * @property {string} type 入力する日付の種類
 * @property {string} label 入力フォームのラベル
 * @property {string} placeholder 入力フォームのプレースホルダー
 * @property {function} validator 入力値のバリデーション関数
 * @property {boolean} disabled 入力フォームの無効化
 * @property {string} value 入力フォームの値
 * @property {string} className 入力フォームのクラス名
 */
type DateInputProps = {
  type: "year" | "month" | "day";
  label: string;
  id: string;
  value: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  targetDateFormValue?: TargetDateForm;
  validator?: (val: string | null) => boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};

/**
 * 日付入力コンポーネント
 * @param {DateInputProps} props
 * @param {string} props.type 入力する日付の種類
 * @param {string} props.label 入力フォームのラベル
 * @param {string} props.placeholder 入力フォームのプレースホルダー
 * @param {function} props.validator 入力値のバリデーション関数
 * @param {string} props.className 入力フォームのクラス名
 * @param {boolean} props.disabled 入力フォームの無効化
 * @param {string} props.value 入力フォームの値
 * @param {function} props.onChange 入力フォームの値が変更された時のコールバック関数
 * @param {function} props.onBlur 入力フォームからフォーカスが外れた時のコールバック関数
 * @returns {JSX.Element} 日付入力コンポーネント
 */
export const DateInput = ({
  id,
  type,
  label,
  placeholder,
  className,
  disabled = false,
  value,
  onChange,
  onBlur = () => {},
}: DateInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="flex items-center">
      <label htmlFor={id}>
        <input
          id={id}
          name={type}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          className={className}
          disabled={disabled}
          onChange={handleChange}
          onBlur={onBlur}
          inputMode="numeric"
        />
        <span className="pl-2">{label}</span>
      </label>
    </div>
  );
};

type CommonDateInputProps = Omit<
  DateInputProps,
  "type" | "placeholder" | "label"
>;

export const YearInput = (props: CommonDateInputProps) => (
  <DateInput
    id={`${props.id}Year`}
    value={props.value}
    type="year"
    label="年"
    placeholder="年を入力"
    className="h-14 w-28"
    validator={validateYear(props.targetDateFormValue?.era ?? "Reiwa")}
    disabled={props.disabled}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
  />
);

export const MonthInput = (props: CommonDateInputProps) => (
  <DateInput
    id={`${props.id}Month`}
    value={props.value}
    type="month"
    label="月"
    placeholder="月"
    validator={validateMonth}
    className="h-14 w-16"
    disabled={props.disabled}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
  />
);

export const DayInput = (props: CommonDateInputProps) => (
  <DateInput
    id={`${props.id}Day`}
    value={props.value}
    type="day"
    label="日"
    placeholder="日"
    validator={validateDay}
    className="h-14 w-16"
    disabled={props.disabled}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
  />
);

const validateMonth = (value: string | null): boolean => {
  return (
    value === null ||
    value === "" ||
    (Number(value) >= 1 && Number(value) <= 12)
  );
};

const validateDay = (value: string | null): boolean => {
  return (
    value === null ||
    value === "" ||
    (Number(value) >= 1 && Number(value) <= 31)
  );
};

const eraYearRanges: Record<Era, { min: number; max: number }> = {
  Reiwa: { min: 1, max: 99 },
  Heisei: { min: 1, max: 31 },
  Showa: { min: 1, max: 64 },
  Taisho: { min: 1, max: 15 },
  Meiji: { min: 1, max: 45 },
};

const validateYear =
  (era: Era) =>
  (year: string | null): boolean => {
    if (year === null || year === "") return true;

    const yearNum = Number(year);
    const yearRange = eraYearRanges[era];

    if (!yearRange) return false;

    return (
      year.length <= 2 && yearNum >= yearRange.min && yearNum <= yearRange.max
    );
  };
