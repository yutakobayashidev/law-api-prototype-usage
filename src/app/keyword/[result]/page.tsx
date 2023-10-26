import ErrorMessageBlock from "@/components/search-result/error-message-block";
import SearchResult from "@/components/search-result/search-result";
import { OFFSET_LIMIT } from "@/const/common";
import { getLawDataFromKeyword } from "@/lib/api/get-keyword";
import logger from "@/lib/utils/logger";
import { RequestKeywordSearchParams } from "@/lib/utils/zod-schemas/request-keyword-search-params-schema";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "キーワード検索画面 | 公開UI",
  description: "本ページの説明文",
};

/**
 * 検索条件に基づいて法令データをキーワード検索APIから取得し、検索結果を表示する
 *
 * @param {RequestKeywordSearchParams} searchParams - 検索条件
 * @returns {JSX.Element} - 検索結果
 */
export default async function KeywordResult({
  searchParams,
}: {
  searchParams: RequestKeywordSearchParams;
}) {
  logger.info({
    message: "[keyword/result]",
  });

  // キーワード検索API(/keyword)を利用した検索結果の取得
  const searchResult = await getLawDataFromKeyword(searchParams);

  return (
    <>
      {/** エラー時の表示 */}
      {searchResult?.isSuccess === false && (
        <ErrorMessageBlock message={searchResult.error.message} />
      )}
      {/** 検索結果 */}
      {searchResult?.isSuccess && searchResult.value !== null && (
        <SearchResult
          result={searchResult.value}
          offsetLimit={OFFSET_LIMIT}
          asOf={searchParams?.asof}
        />
      )}
    </>
  );
}
