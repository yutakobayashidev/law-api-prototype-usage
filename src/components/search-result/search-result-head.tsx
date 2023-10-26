import { toJapaneseEra } from "@/lib/utils/date";
import { DropdownSkelton } from "../elements/drop_down";

/**
 * 検索結果画面のヘッダーのprops
 */
type SearchResultHeadProps = SearchResultCountProps & SearchResultTargetProps;

/**
 * 検索結果の件数を表示するコンポーネント
 * @param {SearchResultHeadProps} props - 検索結果の件数を表示するためのプロパティ
 * @param {string} props.asOf - 検索結果の時点指定日付
 * @param {number} props.count - 検索結果の件数
 * @param {number} props.startPage - 検索結果の開始ページ
 * @param {number} props.endPage - 検索結果の終了ページ
 * @returns {JSX.Element} - 検索結果の件数を表示するコンポーネント
 */
const SearchResultHead = (props: SearchResultHeadProps) => {
  const { asOf, count = 0, startPage, endPage } = props;
  return (
    <div className="flex flex-col">
      <SearchResultTargetDate asOf={asOf} />
      <SearchResultCount
        count={count}
        startPage={startPage}
        endPage={endPage}
      />
    </div>
  );
};

export default SearchResultHead;

type SearchResultTargetProps = {
  asOf?: string;
};

/**
 * 検索結果の指定時点状態を表示するコンポーネント
 * @param {SearchResultTargetProps} props - 検索結果の指定時点状態を表示するためのプロパティ
 * @param {string} props.asOf - 検索結果の時点指定日付
 * @returns {JSX.Element} - 検索結果の指定時点状態を表示するコンポーネント
 */
const SearchResultTargetDate = ({ asOf }: SearchResultTargetProps) => {
  return (
    <div>
      <span className="font-bold">時点指定:</span>
      {asOf ? (
        <span>{toJapaneseEra(new Date(asOf), true)} 時点</span>
      ) : (
        <span>現行法令</span>
      )}
    </div>
  );
};

/**
 * 検索結果の件数を表示するコンポーネントのprops
 * @param {number} count - 検索結果の件数
 * @param {number} startPage - 表示中のページの最初の件数
 * @param {number} endPage - 表示中のページの最後の件数
 */
type SearchResultCountProps = {
  count: number;
  startPage: number;
  endPage: number;
};

/**
 * 検索結果の件数を表示するコンポーネント
 * @param {SearchResultCountProps} props - 検索結果の件数を表示するコンポーネントのprops
 * @param {number} props.count - 検索結果の件数
 * @param {number} props.startPage - 表示中のページの最初の件数
 * @param {number} props.endPage - 表示中のページの最後の件数
 * @returns {JSX.Element} 検索結果の件数を表示するコンポーネント
 */
const SearchResultCount = ({
  count,
  startPage,
  endPage,
}: SearchResultCountProps) => {
  return (
    <div className="font-bold">
      <span
        className="text-10xl text-light-Text-Active pr-2"
        data-testid="result-all-items-count"
      >
        {count}
      </span>
      <span className="text-4xl font-bold pr-1">件</span>
      <span className="font-normal" data-testid="show-result-items-count">
        (<span>{startPage}</span>~<span>{endPage}</span>件目 表示中)
      </span>
    </div>
  );
};

/**
 * 検索結果のヘッダーのスケルトンを表示するためのコンポーネント
 * @returns {JSX.Element} SearchResultHeadSkeltonコンポーネント
 */
export const SearchResultHeadSkelton = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-light-Border-Divider py-3 animate-pulse">
      <div className="flex flex-col gap-3">
        {/** 時点 */}
        <div className="rounded-6xl h-3.5 bg-Sumi-200 w-48" />
        {/** 件数 */}
        <div className="flex items-end gap-2 h-12 py-2">
          <div className="rounded-6xl h-9 bg-Sumi-200 w-20" />
          <div className="rounded-6xl h-3.5 bg-Sumi-200 w-40" />
        </div>
      </div>
      {/** ソート順変更 ドロップダウン */}
      <DropdownSkelton />
    </div>
  );
};
