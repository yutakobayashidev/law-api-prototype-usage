import RevisionsWrapper from "@/components/revision-list/revision-list";
import ErrorMessageBlock from "@/components/search-result/error-message-block";
import { Metadata } from "next";
import RevisionItem from "@/components/revision-list/revision-item";
import { getNewlyEnactedLawId } from "@/lib/law/law";
import { getRevision } from "@/lib/api/get-revision";
import logger from "@/lib/utils/logger";

export const metadata: Metadata = {
  title: "沿革画面 | 公開UI",
  description: "...",
};

/**
 * 沿革画面ページコンポーネント
 * @param params.lawId 法令ID
 * @returns {JSX.Element} 沿革画面ページコンポーネント
 */
export default async function Revision({
  params,
  searchParams,
}: {
  params: { lawId: string };
  searchParams: { lawRevisionId: string };
}) {
  logger.info({
    message: "[revision]",
  });

  // 法令履歴一覧取得API(/revisions)を利用した法令履歴一覧データの取得
  const result = await getRevision({
    lawId: params.lawId,
  });

  if (!result.isSuccess) {
    return <ErrorMessageBlock message={result.error.message} />;
  }

  if (result.isSuccess) {
    const selectRevision = searchParams.lawRevisionId
      ? result.value.revisions?.find(
          (dt) => dt.lawRevisionId == searchParams.lawRevisionId
        )
      : result.value.revisions.length > 0
      ? result.value.revisions[0]
      : undefined;

    // 新規制定の法令のId
    const newlyEnactedId = getNewlyEnactedLawId(result.value.revisions);
    return (
      <>
        <div className="px-3 fixed z-20 md:relative bg-White-1000 flex h-12 w-full md:border-none border-b border-gray-200 items-center">
          <span className="font-bold">沿革一覧</span>
        </div>
        <div className="pt-12 md:pt-0 md:border md:border-gray-200 rounded-2xl">
          {/** 法令名、法令番号 */}
          <div className="h-12 p-3 truncate border-b border-light-Border-Divider">
            <span className="font-bold" data-testid="law-title">
              {selectRevision && selectRevision.lawTitle}
            </span>
            <span data-testid="law-num">（{result.value.lawInfo.lawNum}）</span>
          </div>
          {/** 沿革一覧ブロック */}
          <RevisionsWrapper>
            {/** 沿革一覧 施行日順で返却 */}
            {result.value.revisions.map((revision) => {
              return (
                <RevisionItem
                  key={revision.lawRevisionId}
                  lawId={params.lawId}
                  revision={revision}
                  isSelected={
                    revision.lawRevisionId === searchParams.lawRevisionId
                  }
                  isNewlyEnactedLaw={revision.lawRevisionId === newlyEnactedId}
                />
              );
            })}
          </RevisionsWrapper>
        </div>
      </>
    );
  }
}
