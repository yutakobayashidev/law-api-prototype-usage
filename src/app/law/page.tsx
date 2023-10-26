import Link from "next/link";
import { LawComponent } from "@/components/law/law";
import { LawSideComponent } from "@/components/law/law_side";
import ViewInfoButton from "@/components/law/view-info-button";
import Icon from "@/components/elements/icons";
import ErrorMessageBlock from "@/components/search-result/error-message-block";
import LawTitle from "@/components/law/law-title";
import LawNum from "@/components/law/law-num";
import { EnforcementDate } from "@/components/revision-list/revision-item";
import { LawTag } from "@/components/elements/tag";
import { buildQueryString } from "@/lib/utils/helper";
import { Metadata } from "next";
import { getLawComponentData, getLawData } from "@/lib/api/get-law-data";
import logger from "@/lib/utils/logger";

export const metadata: Metadata = {
  title: "法令画面 | 公開UI",
  description: "本ページの説明文",
};

/**
 * 法令画面
 * @param searchParams 検索条件
 * @returns {JSX.Element} 法令画面
 */
export default async function Law({
  searchParams,
}: {
  searchParams: {
    lawId: string;
    asof?: string;
  };
}) {
  logger.info({
    message: "[law]",
  });

  // 法令本文取得API(/lawdata)を利用した本文情報の取得
  const result = await getLawData(searchParams);

  if (result.isSuccess) {
    if (!result.value.lawFullText) {
      throw Error("法令データがありません。");
    }
    const laws = getLawComponentData(result.value.lawFullText);

    // 沿革画面へのリンクの作成
    const queryString = buildQueryString({
      lawRevisionId: result.value.revisionInfo?.lawRevisionId ?? "",
    });
    const revisionLink = `/revision/${
      result.value.lawInfo?.lawId ?? ""
    }?${queryString}`;

    return (
      <>
        {/** 法令種別,法令名,法令番号 */}
        <div className="md:relative fixed z-20 flex items-center w-full h-12 bg-White-1000 border-b md:border-none border-light-Border-Divider">
          <div className="pl-3 pr-2 block">
            <LawTag type={result.value.lawInfo?.lawType} />
          </div>
          <div
            className="items-center truncate flex-grow"
            data-testid="law-title-and-law-num"
          >
            <LawTitle value={laws.lawTitle} />
            <LawNum value={laws.lawNum} />
          </div>
          <ViewInfoButton
            lawTitle={laws.lawTitle}
            lawNum={laws.lawNum}
            lawType={result.value.lawInfo?.lawType ?? ""}
            publicDate={laws.PromulgateDate}
            revisionInfo={result.value.revisionInfo}
          />
        </div>
        {/** 法令本文ブロック */}
        <div className="grid grid-cols-12 md:border md:rounded-2xl overflow-y-auto">
          <div className="hidden md:block md:col-span-4 border-r md:w-auto">
            <LawSideComponent
              publicDate={laws.PromulgateDate}
              revisionInfo={result.value.revisionInfo}
            />
          </div>
          {/** 条文本文 */}
          <div className="pt-12 md:pt-0 px-5 md:px-0 col-span-12 md:col-span-8 md:w-auto">
            {/** 施行日・沿革情報 ヘッド部分 */}
            <div className="hidden md:flex h-12 px-3 border-b bg-light-Background-Secondary items-center justify-between">
              <div className="flex gap-2 items-center flex-shrink overflow-hidden">
                <EnforcementDate
                  revision={result.value.revisionInfo}
                  className="truncate"
                />
              </div>
              {/** 沿革一覧リンク*/}
              <Link
                className="whitespace-nowrap "
                href={revisionLink}
                aria-label="沿革一覧を表示"
                title="沿革一覧を表示"
                data-testid="revision-link-pc"
              >
                <span className="md:hidden lg:block">沿革一覧を表示</span>
                <div className="lg:hidden flex-shrink-0 min-w-max">
                  <Icon name="timeline" />
                </div>
              </Link>
            </div>
            <div className="md:hidden pt-3">
              <Link
                className={`flex min-h-[60px] text-left text-light-Text-Body border border-gray-300 rounded-2xl px-1 py-2 no-underline bg-White-1000`}
                href={revisionLink}
                aria-label="沿革一覧を表示"
                data-testid="revision-link-mobile"
              >
                <div className={"flex w-8"}>
                  <span
                    className={`border-l-4 border-Sumi-300 relative left-3`}
                  />
                  <span
                    className={`text-2xl w-5 h-5 rounded-full relative z-10 bg-Forest-300 top-1/4`}
                  />
                </div>
                <EnforcementDate
                  revision={result.value.revisionInfo}
                  className="w-full self-center"
                />
              </Link>
            </div>
            {/** 法令表示部分 */}
            <div className="py-3 md:px-3 overflow-y-auto md-max-height-law">
              <LawComponent
                lawNum={laws.lawNum}
                lawBody={laws.lawBody}
                lawTitle={laws.lawTitle}
                treeElement={[]}
                lawRevisionId={result.value.revisionInfo?.lawRevisionId ?? ""}
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <ErrorMessageBlock message={result.error.message} />;
  }
}
