import { buildQueryString } from "@/lib/utils/helper";
import Link from "next/link";

/**
 * 法令タイトル リンクコンポーネントprops
 * @param {string} lawTitle - 法令名(ex.労働基準法)
 * @param {string} lawNumber - 法令番号(ex.昭和二十一年法律第三十六号)
 * @param {string} lawId - 法令ID (ex. 0000360001)
 * @param {string} asof - 時点指定日付 (ex. 20210401)
 */
type LawTagProps = {
  lawTitle: string;
  lawNumber: string;
  lawId: string;
  asof?: string;
};

/**
 * 法令タイトル リンクコンポーネント
 * @param {LawTagProps} props - 法令タイトル リンクコンポーネントprops
 * @returns {JSX.Element} - 法令タイトル リンク
 */
const lawTitleLink = (props: LawTagProps) => {
  const { lawTitle, lawNumber, lawId, asof } = props;
  const query = buildQueryString({ lawId, asof });
  const href = `/law?${query}`;

  return (
    <Link
      className="text-light-Text-Body decoration-dark-Text-Primary"
      href={href}
      aria-label={`${lawTitle} (${lawNumber})`}
      target="_blank"
    >
      <span className="font-bold">{lawTitle}</span>
      <span>({lawNumber})</span>
    </Link>
  );
};

export default lawTitleLink;
