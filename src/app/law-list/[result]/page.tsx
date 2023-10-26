import ErrorMessageBlock from "@/components/search-result/error-message-block";
import SearchResult from "@/components/search-result/search-result";
import { OFFSET_LIMIT } from "@/const/common";
import { getLawList } from "@/lib/api/get-law-list";
import logger from "@/lib/utils/logger";
import { ResultLawListSearchParams } from "@/lib/utils/zod-schemas/request-law-list-search-params-schema";

/**
 * 検索条件に基づいて法令データを文書一覧取得APIから取得し、検索結果を表示する
 *
 * @param {ResultLawListSearchParams} searchParams - 検索条件
 * @returns {JSX.Element} - 検索結果
 */
export default async function LawListResult({
  searchParams,
}: {
  searchParams: ResultLawListSearchParams;
}) {
  logger.info({
    message: "[law-list/result]",
  });

  
  // 文書一覧取得API(/laws)を利用した検索結果の取得
  const searchResult = await getLawList(searchParams);

  return (
    <>
      {/** エラー時の表示 */}
      {searchResult?.isSuccess === false && (
        <ErrorMessageBlock message={searchResult.error.message} />
      )}
      {/** 検索結果 */}
      {searchResult.isSuccess && searchResult.value !== null && (
        <SearchResult
          result={searchResult.value}
          offsetLimit={OFFSET_LIMIT}
          asOf={searchParams?.asof}
        />
      )}
    </>
  );
}
