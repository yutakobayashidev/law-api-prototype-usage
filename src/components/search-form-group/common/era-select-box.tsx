"use client";
import Dropdown from "@/components/elements/dropdown";
import { Era } from "@/lib/typescript-fetch";

const ERA_SELECT_BOX_OPTIONS: {
  value: Era;
  label: string;
}[] = [
  { value: "Reiwa", label: "令和" },
  { value: "Heisei", label: "平成" },
  { value: "Showa", label: "昭和" },
  { value: "Taisho", label: "大正" },
  { value: "Meiji", label: "明治" },
];

type EraSelectBoxProps = {
  id: string;
  value: Era;
  onChange: (value: string) => void;
  disabled?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
};

/**
 * 元号を選択するセレクトボックス
 * @param {EraSelectBoxProps} props
 * @param {function} props.onChange セレクトボックスの選択時のコールバック関数
 * @param {boolean} props.disabled セレクトボックスの無効化
 * @returns
 */
const EraSelectBox = ({
  id,
  value,
  onChange,
  disabled = false,
  onBlur = () => {},
  onFocus = () => {},
}: EraSelectBoxProps) => {
  return (
    <Dropdown
      id={id}
      value={value}
      options={ERA_SELECT_BOX_OPTIONS}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default EraSelectBox;
