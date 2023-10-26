import { toJapaneseEra } from "@/lib/utils/date";

/**
 * 公布日、施行日を表示するコンポーネント
 * @param {"公布日" | "施行日"} label - 表示するラベル(公布日 or 施行日)
 * @param {Date} date - 表示する日付(ex. 20210101) -> コンポーネント内で和暦に変換する
 */
const LawDateLabel = ({
  label,
  date,
}: {
  label: "公布日" | "施行日";
  date?: Date;
}) => {
  return (
    <div className="text-light-Text-Body flex gap-2">
      <span className="font-bold">{label}</span>
      <span>{date ? toJapaneseEra(date, true) : ""}</span>
    </div>
  );
};

export default LawDateLabel;
