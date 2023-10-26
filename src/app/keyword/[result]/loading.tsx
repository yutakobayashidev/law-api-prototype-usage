import { SearchResultWrapper } from "@/components/search-result/search-result";
import { SearchResultHeadSkelton } from "@/components/search-result/search-result-head";
import { SearchResultItemSkelton } from "@/components/search-result/search-result-item";
import { SKELTON_ITEMS } from "@/const/common";

/**
 * 検索結果画面用のloadingコンポーネント
 * コンテンツ読み込み中の状態を表示するloadingコンポーネント
 * @returns {JSX.Element} 検索画面用のloadingコンポーネント
 */
const Loading = () => {
  return (
    <SearchResultWrapper>
      {/** 検索結果のスケルトン */}
      <SearchResultHeadSkelton />
      <div className="flex flex-col gap-4 py-4">
        {SKELTON_ITEMS.map((item) => {
          return <SearchResultItemSkelton key={item.key} isKeywordResponse />;
        })}
      </div>
    </SearchResultWrapper>
  );
};

export default Loading;
