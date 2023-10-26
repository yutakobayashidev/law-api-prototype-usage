import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import RevisionsWrapper from "@/components/revision-list/revision-list";
import { RevisionItemSkeleton } from "@/components/revision-list/revision-item";
import { SKELTON_ITEMS } from "@/const/common";
import SkeletonTheme from "@/components/elements/skeleton-theme";

/**
 * 沿革画面用のloadingコンポーネント
 * コンテンツ読み込み中の状態を表示するloadingコンポーネント
 */
const Loading = () => {
  return (
    <div>
      <SkeletonTheme>
        <div className="px-1 fixed z-20 md:relative bg-White-1000 flex gap-2 h-12 w-full md:border-none border-b border-gray-200 items-center">
          <Skeleton circle width={18} height={18} />
          <Skeleton width={200} />
        </div>
        <div className="pt-12 md:pt-0 md:border md:border-light-Border-Divider rounded-2xl">
          {/** 法令名・法令番号 */}
          <div className="p-3 border-b border-light-Border-Divider truncate">
            <div className="flex gap-1">
              <Skeleton width={400} />
              <Skeleton width={200} />
            </div>
          </div>
          {/** 沿革一覧ブロック */}
          <RevisionsWrapper>
            {SKELTON_ITEMS.map((_, index) => {
              return <RevisionItemSkeleton key={index} />;
            })}
          </RevisionsWrapper>
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Loading;
