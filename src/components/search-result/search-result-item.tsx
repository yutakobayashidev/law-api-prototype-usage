"use client";
import LawTitleLink from "./law-name-link";
import LawDateLabel from "./law-date-label";
import Icon from "../elements/icons";
import { LawTag } from "../elements/tag";
import Link from "next/link";
import LawSnippet from "./law-snippet";
import AmendmentInfo from "./amendment-info";
import {
  KeywordResponseItemsInner,
  LawsResponseLawsInner,
} from "@/lib/typescript-fetch";
import useModalToggleHooks from "@/hooks/modal-toggle-hooks";

/**
 * 検索結果の法令データの型定義
 * @param {KeywordResponseItemsInner} item
 */
type SearchResultItemProps = {
  item: KeywordResponseItemsInner | LawsResponseLawsInner;
  asOf?: string;
};

/**
 * 検索結果の法令データを表示するコンポーネント
 * @param {SearchResultItemProps} props - 検索結果の法令データ
 * @param {KeywordResponseItemsInner | LawsResponseLawsInner} props.item - 検索結果の法令データ
 * @param {string} props.asOf - 検索結果の法令データ
 * @returns {JSX.Element} - 検索結果の法令データ
 */
const SearchResultItem = ({ item, asOf }: SearchResultItemProps) => {
  const id = `searchResultItem_${item.revisionInfo?.lawRevisionId}`;

  const { isShow, onClickToggleVisibility } = useModalToggleHooks(`#${id}`);

  const isKeywordResponse = "sentence" in item;
  const lawTitle = item.revisionInfo?.lawTitle ?? "";
  return (
    <div
      id={id}
      className="relative flex flex-col gap-2 border py-4 border-light-Border-Divider rounded-6xl"
    >
      {/** 法令名 */}
      <div className="border-b flex items-center px-4 pb-3">
        <LawTitleLink
          lawTitle={lawTitle}
          lawNumber={item.lawInfo?.lawNum ?? ""}
          lawId={item.lawInfo?.lawId ?? ""}
          asof={asOf}
        />
        {/** 改正情報等 表示アイコン */}
        <button
          className="pl-2 min-w-max"
          type="button"
          onClick={onClickToggleVisibility}
        >
          <Icon name="info" />
        </button>
      </div>
      <div className="flex flex-col px-4 gap-2 md:flex-row items-start justify-between">
        {/** 法令種別を表示するタググループ */}
        <LawTag type={item?.revisionInfo?.lawType} />
        <div>
          {/** 公布日 */}
          <LawDateLabel
            label={"公布日"}
            date={item.revisionInfo?.amendmentPromulgateDate}
          />
          {/** 施行日 */}
          <LawDateLabel
            label={"施行日"}
            date={item.revisionInfo?.amendmentEnforcementDate}
          />
        </div>
      </div>
      {/** スニペット表示 */}
      {isKeywordResponse && (
        <LawSnippet
          lawRevisionId={item.revisionInfo?.lawRevisionId ?? ""}
          sentence={(item as KeywordResponseItemsInner).sentence}
        />
      )}
      <div className="w-full px-4 text-right">
        {/** 沿革情報リンク */}
        <Link
          className="text-light-Text-Body flex items-center justify-start md:justify-end"
          href={`/revision/${item.lawInfo?.lawId}`}
          target="_blank"
          title={`${lawTitle}の条文沿革を表示`}
        >
          <Icon name="timeline" />
          <span className="pl-1 decoration-dark-Text-Primary underline">
            条文沿革を表示
          </span>
        </Link>
      </div>
      {isShow && (
        <AmendmentInfo
          amendmentLawTitle={item.revisionInfo?.amendmentLawTitle ?? ""}
          amendmentLawNum={item.revisionInfo?.amendmentLawNum ?? ""}
          amendmentPromulgateDate={item.revisionInfo?.amendmentPromulgateDate}
          onCloseAmendmentInfo={onClickToggleVisibility}
        />
      )}
    </div>
  );
};

export default SearchResultItem;

/**
 * SearchResultItemSkeltonコンポーネントは、検索結果のスケルトンを表示するためのコンポーネントです。
 *
 * @param {Object} props - Reactコンポーネントのプロパティ
 * @param {boolean} [props.isKeywordResponse=false] - スニペットを表示するかどうかのフラグ
 * @returns {JSX.Element} SearchResultItemSkeltonコンポーネント
 */
export const SearchResultItemSkelton = ({
  isKeywordResponse = false,
}: {
  isKeywordResponse?: boolean;
}) => {
  return (
    <div className="relative flex flex-col gap-2  py-4 border border-light-Border-Divider rounded-6xl animate-pulse">
      <div className="border-b flex items-center px-4 pb-3 gap-2">
        {/** 法令名部分 */}
        <div className="h-4 bg-Sumi-200 rounded-6xl w-full" />
        <div className="min-w-max">
          <div className="h-8 bg-Sumi-200 rounded-6xl w-8" />
        </div>
      </div>
      <div className="flex flex-col px-4 gap-2 md:flex-row items-start justify-between">
        {/** 法令種別を表示するタググループ */}
        {/** <LawTag type={item?.revisionInfo?.lawType ?? ""} />*/}
        <div className="rounded-6xl h-8 bg-Sumi-200  w-14" />
        <div className="flex flex-col gap-2 h-12">
          {/** 公布日・施行日 */}
          <div className="rounded-6xl h-3.5  bg-Sumi-200 w-60" />
          <div className="rounded-6xl h-3.5 bg-Sumi-200 w-60" />
        </div>
      </div>
      {/** スニペット表示 */}
      {isKeywordResponse && (
        <div className="px-4 py-2 flex flex-col gap-2">
          <div className="h-3 bg-Sumi-200 rounded-6xl"></div>
          <div className="h-3 bg-Sumi-200 rounded-6xl"></div>
          <div className="h-3 bg-Sumi-200 rounded-6xl"></div>
        </div>
      )}
      <div className="w-full h-6 px-4 text-right flex items-center md:justify-end">
        {/** 沿革情報リンク */}
        <div className="w-36 h-3.5 bg-Sumi-200 rounded-6xl"></div>
      </div>
    </div>
  );
};
