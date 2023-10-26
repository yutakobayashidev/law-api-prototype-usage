import { toJapaneseEra } from "@/lib/utils/date";

type AmendmentInfoProps = {
  amendmentLawTitle: string;
  amendmentLawNum: string;
  amendmentPromulgateDate?: Date;
  onCloseAmendmentInfo: () => void;
};

/**
 * 検索結果アイテムの改正法令情報 (改正法令番号、改正法令公布日) を表示するコンポーネント
 * @param {Object} props - Reactコンポーネントのプロパティ
 * @param {string} props.amendmentLawTitle - 改正法令名
 * @param {string} props.amendmentLawNum - 改正法令番号
 * @param {Date} props.amendmentPromulgateDate - 改正法令公布日
 * @returns {React.ReactNode} - 検索結果アイテムの改正法令情報
 */
const AmendmentInfo = ({
  amendmentLawTitle,
  amendmentLawNum,
  amendmentPromulgateDate,
  onCloseAmendmentInfo,
}: AmendmentInfoProps) => {
  return (
    <div className="min-h-full absolute z-10 rounded-6xl top-0 flex flex-col items-start border bg-light-Background-Primary w-full border-light-Border-Divider">
      <div className="flex w-full border-b justify-between px-4 py-3">
        <span className="font-bold">改正法令情報</span>
        <button onClick={onCloseAmendmentInfo}>閉じる</button>
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        <div>
          <span className="font-bold pr-2">改正法令名</span>
          <span>{amendmentLawTitle}</span>
        </div>
        <div>
          <span className="font-bold pr-2">改正法令番号</span>
          <span>{amendmentLawNum}</span>
        </div>
        <div>
          <span className="font-bold pr-2">改正法令公布日</span>
          <span>
            {amendmentPromulgateDate
              ? toJapaneseEra(amendmentPromulgateDate, true)
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AmendmentInfo;
