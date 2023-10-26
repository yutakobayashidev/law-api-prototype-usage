import { InputRadio } from "@/components/elements/input_radio";
import InputForm from "@/components/input-form";

/**
 * 法令名検索フォームのProps
 * @param {string} id - inputタグのid
 * @param {string} name - inputタグのname
 * @param {string} label - ラベル
 * @param {string} htmlFor - ラベルのfor属性
 * @param {string} helpText - ヘルプテキスト
 * @param {string} placeholder - プレースホルダー
 * @param {Function} onChange - inputタグのonChangeイベント
 * @param {string} value - inputタグのvalue
 */
type LawTitleOrNumberSearchForm = {
  id: string;
  name: string;
  label: string;
  htmlFor: string;
  helpText: string;
  placeholder?: string;
  value?: string;
  selectedValue?: "lawTitle" | "lawNum";
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickRadio: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

/**
 * 法令名・法令番号検索フォーム
 * @returns {JSX.Element} 法令名検索フォーム
 */
export const LawTitleOrNumberSearchForm = (
  props: LawTitleOrNumberSearchForm
) => {
  const {
    id,
    name,
    label,
    helpText,
    placeholder = "",
    value = "",
    selectedValue = "lawTitle",
    onChangeInput,
    onClickRadio,
  } = props;
  return (
    <InputForm>
      <InputForm.Label>{label}</InputForm.Label>
      <InputForm.HelpText>{helpText}</InputForm.HelpText>
      <InputForm.FormBlock>
        <div className="w-full flex items-center gap-3">
          <InputRadio
            item={{
              id: "lawTitle",
              label: "法令名",
              disabled: false,
              required: true,
            }}
            name={"lawTitleOrLawNum"}
            val={"lawTitle"}
            onClick={onClickRadio}
            selectedValue={selectedValue}
          />
          <InputRadio
            item={{
              id: "lawNum",
              label: "法令番号",
              disabled: false,
              required: true,
            }}
            name={"lawTitleOrLawNum"}
            val={"lawNum"}
            onClick={onClickRadio}
            selectedValue={selectedValue}
          />
        </div>
        <div className="pt-2 pb-3">
          <InputForm.Input
            id={id}
            className="w-full"
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChangeInput}
          />
        </div>
      </InputForm.FormBlock>
    </InputForm>
  );
};

/**
 * 法令名検索フォームのProps
 * @param {string} id - inputタグのid
 * @param {string} name - inputタグのname
 * @param {string} label - ラベル
 * @param {string} htmlFor - ラベルのfor属性
 * @param {string} helpText - ヘルプテキスト
 * @param {string} placeholder - プレースホルダー
 * @param {Function} onChange - inputタグのonChangeイベント
 * @param {string} value - inputタグのvalue
 */
type TextFormGroupProps = {
  id: string;
  name: string;
  label: string;
  htmlFor: string;
  helpText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  error?: string;
};

/**
 * 法令名検索フォーム
 * @returns {React.ReactNode} 法令名検索フォーム
 */
const TextFormGroup = (props: TextFormGroupProps) => {
  const {
    id,
    name,
    label,
    helpText,
    onChange,
    onBlur = () => {},
    value = "",
    placeholder = "",
    error = "",
  } = props;
  return (
    <InputForm>
      <InputForm.Label>
        {label}
        <span className="pl-2 font-normal text-xs text-light-Text-Alert">
          必須
        </span>
      </InputForm.Label>
      <InputForm.HelpText>{helpText}</InputForm.HelpText>
      <InputForm.Input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        isError={!!error}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <InputForm.ErrorText>{error}</InputForm.ErrorText>}
    </InputForm>
  );
};

export default TextFormGroup;
