import Link from "next/link";
/**
 * ページタブアイテムのプロパティ
 * @param label 表示用のラベル
 * @param href リンク先のURL
 * @param isActive アクティブかどうか
 */
type PageTabItemProps = {
  label: string;
  href: string;
  isActive: boolean;
};

/**
 * ページタブアイテム
 * @param {PageTabItemProps} props プロパティ
 * @returns {JSX.Element} ページタブアイテム
 */
const PageTabItem = (props: PageTabItemProps) => {
  const { label, href, isActive } = props;
  const style = isActive
    ? "text-light-Text-Active border-b-2 border-b-light-Text-Active"
    : "text-light-Text-Body border-b-2 border-b-transparent";

  return (
    <Link
      className={`flex items-center justify-center px-4 font-bold h-14 w-1/2 no-underline cursor-pointer ${style}`}
      aria-label={label}
      role="link"
      tabIndex={0}
      href={href}
      title={label}
    >
      {label}
    </Link>
  );
};

export default PageTabItem;
