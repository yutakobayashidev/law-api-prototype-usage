"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Icon from "./elements/icons";
import { generateHash } from "@/lib/utils/helper";

/**
 * 現在のページ番号を取得する
 * @param totalCount
 * @param nextOffset
 * @param itemsPerPage
 * @returns
 */
const getCurrentPage = (
  totalCount: number,
  nextOffset: number | null,
  itemsPerPage: number
) => {
  if (nextOffset !== null) {
    return nextOffset / itemsPerPage;
  }
  return Math.ceil(totalCount / itemsPerPage);
};

/**
 * ページネーションコンポーネントのProps
 * @property {number} currentPage 現在のページ番号
 * @property {number} totalItems 検索結果の総件数
 * @property {number} itemsPerPage 1ページあたりの表示件数
 */
type PaginationProps = {
  totalCount: number;
  nextOffset: number | null;
  itemsPerPage: number;
};

/**
 * ページネーションコンポーネント
 * @param {PaginationProps} props
 * @param {number} props.totalCount 検索結果の総件数
 * @param {number} props.nextOffset 次のページのオフセット
 * @param {number} props.itemsPerPage 1ページあたりの表示件数
 * @returns {React.ReactNode} ページネーションコンポーネント
 */
const Pagination = ({
  totalCount,
  nextOffset = null,
  itemsPerPage,
}: PaginationProps) => {
  const currentPage = getCurrentPage(totalCount, nextOffset, itemsPerPage);
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParams = Array.from(searchParams.entries())
    .reduce((prev, [key, value]) => {
      if (key === "page") return prev;
      return `${prev}${key}=${value}&`;
    }, "")
    .slice(0, -1);

  // 各ページャリンクのページ番号を設定
  const setPageNumber = (pageNumber: number) => {
    const queryParamsWithPage = `page=${pageNumber}&${queryParams}`;
    const hash = generateHash(queryParamsWithPage);
    const newPathname = pathname.replace(/\/([^/]+)\/(.+)$/, `/$1/${hash}`);

    return `${newPathname}?${queryParamsWithPage}`;
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <PaginationLink
        type="first"
        href={setPageNumber(1)}
        isDisabled={currentPage === 1}
      />
      <PaginationLink
        type="prev"
        href={setPageNumber(currentPage - 1)}
        isDisabled={currentPage === 1}
      />
      <span data-testid="current-and-total-pages">
        {currentPage}/{totalPages}
      </span>
      <PaginationLink
        type="next"
        href={setPageNumber(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      />
      <PaginationLink
        type="last"
        href={setPageNumber(totalPages)}
        isDisabled={currentPage === totalPages}
      />
    </div>
  );
};

export default Pagination;

/**
 *  ページネーションのリンク Props
 * @property {string} type ページネーションの種類(first, prev, next, last)
 * @property {string} href ページネーションのリンク先
 * @property {boolean} isDisabled ページネーションのリンクが無効かどうか
 */
type PaginationItemProps = {
  type: "first" | "prev" | "next" | "last";
  href: string;
  isDisabled?: boolean;
};

/**
 * ページネーションのリンク
 * @param {PaginationItemProps} props ページネーションのリンク Props
 * @returns {JSX.Element} ページネーションの各ボタン
 */
const PaginationLink = (props: PaginationItemProps) => {
  const { type, isDisabled = false } = props;

  const paginationTypeMap = {
    first: {
      icon: <Icon name="keyboardDoubleArrowLeft" />,
      text: "First",
    },
    prev: {
      icon: <Icon name="navigateBefore" />,
      text: "Prev",
    },
    next: {
      icon: <Icon name="navigateNext" />,
      text: "Next",
    },
    last: {
      icon: <Icon name="keyboardDoubleArrowRight" />,
      text: "Last",
    },
  };
  const disabledClass = isDisabled ? "opacity-0 pointer-events-none" : "";

  return (
    <Link
      className={`flex items-center justify-center h-12 w-12 rounded-full border border-light-Border-Divider ${disabledClass}`}
      href={props.href}
      aria-label={paginationTypeMap[type].text}
      title={paginationTypeMap[type].text}
    >
      {paginationTypeMap[type].icon}
    </Link>
  );
};
