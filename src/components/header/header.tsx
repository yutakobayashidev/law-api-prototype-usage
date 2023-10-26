import Link from "next/link";
import HeaderDropdown from "./header-dropdown";

/**
 * 共通ヘッダー コンポーネント
 * @returns {React.ReactNode} ヘッダー コンポーネント
 */
const Header = () => {
  return (
    <header className="flex items-center px-3 w-full border-b h-14 fixed top-0 z-50 bg-light-Background-Primary dark:bg-dark-Background-Primary">
      <Link className="flex mr-auto cursor-pointer no-underline" href={"/"}>
        <div className="font-bold text-light-Text-Primary tracking-widest">
          法令検索
        </div>
      </Link>
      <HeaderDropdown />
    </header>
  );
};

export default Header;
