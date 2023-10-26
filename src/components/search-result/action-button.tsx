/**

 *  検索結果アイテムの共通アクションボタンのtype
 * @typedef {Object} ActionButtonProps
 * @property {React.ReactNode} children - ボタンのテキスト
 * @property {string} label - ボタンのラベル(aria-label)
 * @property {Function} onClick - ボタンがクリックされたときに呼び出される関数
 */
type ActionButtonProps = {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
};

/**
 * 検索結果アイテムの共通アクションボタン
 * @returns {JSX.Element} - 共通アクションボタン
 */
const ActionButton = (props: ActionButtonProps) => {
  const { label, onClick } = props;
  return (
    <button type="button" onClick={onClick} aria-label={label} tabIndex={0}>
      {label}
    </button>
  );
};

export default ActionButton;
