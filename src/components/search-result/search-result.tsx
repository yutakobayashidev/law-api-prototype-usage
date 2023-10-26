import { KeywordResponse, LawsResponse } from "@/lib/typescript-fetch";
import DropDownMenuButton from "../elements/drop_down";
import Pagination from "../pagination";
import SearchResultHead from "./search-result-head";
import SearchResultItem from "./search-result-item";

type SearchResultProps = {
  result: KeywordResponse | LawsResponse;
  offsetLimit: number;
  asOf?: string;
};

const getStartAndEndPage = (
  nextOffset: number | undefined | null,
  offsetLimit: number,
  resultCount: number,
  itemsLength: number
) => {
  const startPage = (() => {
    // 検索結果が0件の場合
    if (resultCount === 0) return 0;

    // offsetLimitの件数よりも件数結果が少ない場合
    if (resultCount <= offsetLimit) return 1;

    // 最終ページの場合
    if (nextOffset === undefined) return resultCount - itemsLength;

    return nextOffset ? nextOffset + 1 - offsetLimit : 1;
  })();

  const endPage = (() => {
    if (nextOffset === undefined) return resultCount;
    return nextOffset ? nextOffset : 1;
  })();

  return {
    startPage,
    endPage,
  };
};

/**
 * 検索結果を表示するコンポーネント
 * @param {SearchResultProps} props - SearchResultコンポーネントのprops
 * @param {SearchResultData} props.result - 検索結果のデータ
 * @param {number} props.offsetLimit - 1ページあたりの表示件数
 * @returns {React.ReactNode} SearchResultコンポーネントのJSX要素
 */
const SearchResult = (props: SearchResultProps) => {
  const { result, offsetLimit, asOf } = props;

  const items = (() => {
    if ("laws" in result) {
      return result.laws ?? [];
    } else if ("items" in result) {
      return result.items ?? [];
    }
    return [];
  })();

  const { startPage, endPage } = getStartAndEndPage(
    result.nextOffset,
    offsetLimit,
    result.totalCount ?? 0,
    items.length
  );
  return (
    <SearchResultWrapper>
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-light-Border-Divider py-3">
        {/** 検索結果件数,時点指定 */}
        <SearchResultHead
          asOf={asOf}
          count={result?.totalCount ?? 0}
          startPage={startPage}
          endPage={endPage}
        />
        {/** ソート順変更 ドロップダウン */}
        <DropDownMenuButton />
      </div>
      {/** 検索結果のリスト */}
      <div className="flex flex-col gap-4 py-4">
        {items.map((item) => {
          return (
            <SearchResultItem
              key={item.lawInfo?.lawId}
              item={item}
              asOf={asOf}
            />
          );
        })}
      </div>
      {/** ページネーション */}
      <Pagination
        totalCount={result?.totalCount ?? 0}
        nextOffset={result?.nextOffset ?? null}
        itemsPerPage={offsetLimit}
      />
    </SearchResultWrapper>
  );
};

export default SearchResult;

/**
 * SearchResultWrapperコンポーネントは、検索結果を表示するためのラッパーです。
 *
 * @param {Object} props - Reactコンポーネントのプロパティ
 * @param {React.ReactNode} props.children - SearchResultWrapperコンポーネントの子要素
 * @returns {JSX.Element} SearchResultWrapperコンポーネント
 */
export const SearchResultWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div id="searchResult" className="grid grid-cols-12 gap-3">
      <div className="col-span-12 py-4">{children}</div>
    </div>
  );
};
