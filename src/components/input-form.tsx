import React, { ReactNode, FC } from "react";
/**
 * InputForm コンポーネントのプロパティを定義する型
 * @typedef {Object} InputFormProps
 * @property {React.ReactNode} children - InputForm コンポーネントの子要素
 */
type InputFormProps = {
  children: ReactNode;
};

/**
 * InputForm コンポーネント
 * @typedef {Object} InputFormProps
 * @property {React.ReactNode} children - InputForm コンポーネントの子要素
 * @returns {React.ReactNode} - InputForm コンポーネントの要素
 */
const InputForm: FC<InputFormProps> & {
  Label: FC<LabelProps>;
  Input: FC<InputProps>;
  HelpText: FC<HelpTextProps>;
  FormBlock: FC<{ children: ReactNode }>;
  ErrorText: FC<ErrorTextProps>;
} = ({ children }) => <div className="flex flex-col">{children}</div>;

/**
 * ラベルコンポーネントのプロパティを定義する型
 * @typedef {Object} LabelProps
 * @property {string} htmlFor - ラベルが関連付けられる input 要素の ID
 * @property {React.ReactNode} children - ラベルのテキスト
 */
type LabelProps = {
  children: ReactNode;
  htmlFor?: string;
};

/**
 * InputFormのLabel 用のラベルコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {string} props.htmlFor - ラベルが関連付けられる input 要素の ID
 * @param {React.ReactNode} props.children - ラベルのテキスト
 * @returns {JSX.Element} - ラベル要素
 */
const LabelComponent = ({ htmlFor, children }: LabelProps) => {
  if (htmlFor === undefined) {
    return <span className="font-bold">{children}</span>;
  }

  return (
    <label className="font-bold" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
InputForm.Label = LabelComponent;
InputForm.Label.displayName = "InputForm.Label";

/**
 * Input 要素のプロパティを定義する型
 * @typedef {Object} InputProps
 * @property {string} id - input 要素の ID
 * @property {string} [value] - input 要素の値
 * @property {Function} [onChange] - input 要素の値が変更されたときに呼び出される関数
 * @property {string} [placeholder] - input 要素のプレースホルダー
 * @property {string} [className] - input 要素のクラス名
 * @property {string} name - input 要素の name 属性
 * @property {Function} [onBlur] - input 要素からフォーカスが外れたときに呼び出される関数
 */
type InputProps = {
  id: string;
  name: string;
  value?: string;
  placeholder?: string;
  isError?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * InputFormのInput 用の入力コンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {string} props.id - input 要素の ID
 * @param {string} props.name - input 要素の name 属性
 * @param {string} props.value - input 要素の値
 * @param {string} props.placeholder - input 要素のプレースホルダー
 * @param {string} props.className - input 要素のクラス名
 * @param {Function} props.onChange - input 要素の値が変更されたときに呼び出される関数
 * @returns {JSX.Element} - input 要素
 */
const InputComponent = ({
  id,
  value,
  name,
  placeholder,
  isError = false,
  className = "",
  onChange,
  onBlur = () => {},
}: InputProps) => {
  const inputClassName = isError ? `${className} error` : className;

  return (
    <input
      className={inputClassName}
      type="text"
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      aria-label={placeholder}
    />
  );
};

InputForm.Input = InputComponent;
InputForm.Input.displayName = "InputForm.Input";

/**
 * ヘルプテキストコンポーネントのプロパティを定義する型
 * @typedef {Object} HelpTextProps
 * @property {React.ReactNode} children - ヘルプテキストのテキスト
 */
type HelpTextProps = {
  children: ReactNode;
};

/**
 * ヘルプテキストコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {React.ReactNode} props.children - ヘルプテキストのテキスト
 * @returns {JSX.Element} - ヘルプテキストの要素
 */
const HelpTextComponent = ({ children }: HelpTextProps) => (
  <span className="text-sm text-light-Text-Description pb-2">{children}</span>
);
InputForm.HelpText = HelpTextComponent;
InputForm.HelpText.displayName = "InputForm.HelpText";

/**
 * フォームのブロックコンポーネント
 * @param param0
 * @returns {JSX.Element} - フォームのブロック要素
 */
const FormBlockComponent = ({ children }: { children: ReactNode }) => (
  <div className="py-2 px-2 bg-light-Background-Tertiary border border-light-Border-Divider rounded-6xl">
    {children}
  </div>
);
InputForm.FormBlock = FormBlockComponent;
InputForm.FormBlock.displayName = "InputForm.FormBlock";

/**
 * エラーテキストコンポーネントのプロパティを定義する型
 * @typedef {Object} ErrorTextProps
 * @property {React.ReactNode} children - エラーテキストのテキスト
 */
type ErrorTextProps = {
  children: ReactNode;
};

/**
 * エラーテキストコンポーネント
 * @param {Object} props - プロパティオブジェクト
 * @param {React.ReactNode} props.children - エラーテキストのテキスト
 * @returns {JSX.Element} - エラーテキストの要素
 */
const ErrorTextComponent = ({ children }: ErrorTextProps) => (
  <span className="text-sm text-light-Text-Alert pb-2">{children}</span>
);
InputForm.ErrorText = ErrorTextComponent;
InputForm.ErrorText.displayName = "InputForm.ErrorText";

export default InputForm;
