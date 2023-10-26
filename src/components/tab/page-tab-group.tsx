"use client";
import { usePathname } from "next/navigation";
import PageTabItem from "./page-tab-item";

/**
 * トップページ用のページタブアイテム
 */
const TOP_PAGE_TAB_ITEMS = [
  {
    label: "キーワード検索",
    href: "/keyword",
  },
  {
    label: "詳細検索",
    href: "/law-list",
  },
];

/**
 * ページ切り替え用のタブグループ
 * @returns {JSX.Element} ページ切り替え用のタブグループ
 */
const PageTabGroup = () => {
  const pathName = usePathname();
  return (
    <div className="border-b flex items-center gap-3 h-14 col-span-4 md:col-span-8 md:col-start-3">
      {TOP_PAGE_TAB_ITEMS.map((item, index) => {
        const isActive = pathName.startsWith(item.href);
        return <PageTabItem key={index} {...item} isActive={isActive} />;
      })}
    </div>
  );
};

export default PageTabGroup;
