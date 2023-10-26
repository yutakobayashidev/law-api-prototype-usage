import InputCheckbox from "@/components/elements/input_checkbox";
import InputForm from "@/components/input-form";
import { CategoryCd, LawType } from "@/lib/typescript-fetch";
import { CheckboxItemType } from "@/types/common";

type LawCategoriesCheckboxesProps<T> = {
  label: string;
  helpText: string;
  htmlFor: string;
  items: CheckboxItemType<T>[];
  checkedItems: Record<string, boolean>;
  onChangeCheckbox: (id: string, checked: boolean) => void;
  onClickSelectAllItems: () => void;
  onClickDeselectAllItems: () => void;
};

/**
 *  法令分類のチェックボックスグループ
 * @returns {React.ReactNode} 法令分類のチェックボックスグループ
 */
const CheckboxesForm = <T extends LawType | CategoryCd>(
  props: LawCategoriesCheckboxesProps<T>
) => {
  const {
    label,
    helpText,
    items,
    checkedItems,
    onChangeCheckbox,
    onClickSelectAllItems,
    onClickDeselectAllItems,
  } = props;
  return (
    <InputForm>
      <InputForm.Label>{label}</InputForm.Label>
      <InputForm.HelpText>{helpText}</InputForm.HelpText>
      <InputForm.FormBlock>
        <div className="flex items-center gap-3 font-bold text-xs text-light-Text-Link">
          <button type="button" onClick={onClickSelectAllItems}>
            全選択
          </button>
          <button type="button" onClick={onClickDeselectAllItems}>
            全解除
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/** 法令分類のチェックボックス */}
          {items.map((item) => (
            <InputCheckbox
              key={String(item.id)}
              item={item}
              checked={checkedItems[String(item.id)] || false}
              onChange={onChangeCheckbox}
            />
          ))}
        </div>
      </InputForm.FormBlock>
    </InputForm>
  );
};

export default CheckboxesForm;
