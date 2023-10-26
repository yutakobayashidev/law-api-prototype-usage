/**
 * エラーメッセージを表示するためのコンポーネントのProps
 */
type ErrorMessageBlockProps = {
  message: string;
};

/**
 * エラーメッセージを表示するためのコンポーネント
 * @param {ErrorMessageBlockProps} props - コンポーネントのProps
 * @param {string} props.message - エラーメッセージ
 * @returns {JSX.Element} エラーメッセージを表示する要素
 */
const ErrorMessageBlock = ({ message }: ErrorMessageBlockProps) => {
  return (
    <div className="py-4">
      <div className="text-Sun-500 bg-Sun-50 rounded-6xl px-3 py-4">
        <p className="font-bold text-lg pb-2">エラーが発生しました</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessageBlock;
