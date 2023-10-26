import React from "react";

type LawSnippetProps = {
  lawRevisionId: string;
  sentence?: string;
};

/**
 * 検索結果アイテム キーワード検索時のスニペット コンポーネント
 * @param {LawSnippetProps} props - コンポーネントのProps
 * @param {string} props.lawRevisionId - 法令リビジョンID
 * @param {string} props.sentence - スニペットに表示する文の情報
 * @returns {JSX.Element} 検索結果アイテム キーワード検索時のスニペット
 */
const LawSnippet = ({ lawRevisionId, sentence }: LawSnippetProps) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-1">
      <p
        className="snippet text-xs"
        key={`${lawRevisionId}_sentence`}
        dangerouslySetInnerHTML={{ __html: sentence ?? "" }}
      ></p>
    </div>
  );
};

export default LawSnippet;
