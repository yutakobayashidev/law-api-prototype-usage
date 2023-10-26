import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonTheme from "@/components/elements/skeleton-theme";

/**
 * 法令画面用のloadingコンポーネント
 * コンテンツ読み込み中の状態を表示するloadingコンポーネント
 * @returns {JSX.Element} 法令画面用のloadingコンポーネント
 */
const Loading = () => {
  return (
    <SkeletonTheme>
      <div>
        {/** 法令種別,法令名,法令番号 */}
        <div className="md:relative fixed z-20 flex items-center w-full h-12 px-3 bg-White-1000 border-b md:border-none border-light-Border-Divider">
          <div className="truncate">
            <Skeleton width={600} />
          </div>
        </div>
        {/** 法令本文ブロック */}
        <div className="grid grid-cols-12 md:border md:rounded-2xl overflow-y-auto">
          <div className="hidden md:block md:col-span-4 border-r md:w-auto">
            <div
              className={`border-b h-12 text-center items-center grid truncate`}
            >
              <Skeleton className="max-w-full" width={64} />
            </div>
            {/** 改正法令情報 */}
            <div className="border-b h-12 px-3 items-center grid truncate">
              <Skeleton className="max-w-full" width={96} />
            </div>
            <div className="px-3">
              <div className="py-3 truncate">
                <Skeleton className="max-w-full" width={48} />
                <Skeleton className="max-w-full" width={160} />
              </div>
              <div className="py-3 truncate">
                <Skeleton className="max-w-full" width={80} />
                <Skeleton className="max-w-full" width={300} />
              </div>
              <div className="py-3 truncate">
                <Skeleton className="max-w-full" width={96} />
                <Skeleton className="max-w-full" width={160} />
              </div>
            </div>
          </div>
          {/** 条文本文 */}
          <div className="pt-12 md:pt-0 px-5 md:px-0 col-span-12 md:col-span-8 md:w-auto">
            {/** 施行日・沿革情報 ヘッド部分 */}
            <div className="hidden md:grid h-12 px-3 border-b bg-light-Background-Secondary items-center truncate">
              <Skeleton className="max-w-full" baseColor="white" width={300} />
            </div>
            <div
              className={`md:hidden my-3 grid h-[60px] px-3 py-2 border border-gray-300 rounded-2xl bg-White-1000 items-center truncate`}
            >
              <Skeleton className="max-w-full" width={220} />
            </div>
            {/** 法令表示部分 */}
            <div className="py-3 md:px-3 overflow-y-auto md-max-height-law truncate">
              <Skeleton className="max-w-full" width={150} />
              <Skeleton className="max-w-full" width={120} />
              <div className="pb-3" />
              <Skeleton className="max-w-full" width={400} />
              <Skeleton className="max-w-full" width={400} />
              <Skeleton className="max-w-full" width={380} />
              <Skeleton className="max-w-full" width={360} />
              <Skeleton className="max-w-full" width={300} />
              <Skeleton className="max-w-full" width={400} />
              <Skeleton className="max-w-full" width={200} />
              <Skeleton className="max-w-full" width={260} />
              <Skeleton className="max-w-full" width={380} />
              <Skeleton className="max-w-full" width={400} />
              <Skeleton className="max-w-full" width={340} />
              <Skeleton className="max-w-full" width={320} />
              <Skeleton className="max-w-full" width={120} />
              <Skeleton className="max-w-full" width={200} />
              <Skeleton className="max-w-full" width={140} />
              <Skeleton className="max-w-full" width={180} />
              <Skeleton className="max-w-full" width={160} />
              <Skeleton className="max-w-full" width={280} />
              <Skeleton className="max-w-full" width={300} />
              <Skeleton className="max-w-full" width={380} />
              <Skeleton className="max-w-full" width={420} />
              <Skeleton className="max-w-full" width={200} />
              <Skeleton className="max-w-full" width={260} />
              <Skeleton className="max-w-full" width={380} />
              <Skeleton className="max-w-full" width={400} />
              <Skeleton className="max-w-full" width={340} />
              <Skeleton className="max-w-full" width={320} />
              <Skeleton className="max-w-full" width={120} />
              <Skeleton className="max-w-full" width={200} />
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Loading;
