"use client";

import { useRouter } from "next/navigation";
import Icon from "./elements/icons";

/**
 * 前のページに戻るボタン
 * @returns {JSX.Element} 前のページに戻るボタン
 */
const PageBack = () => {
  const router = useRouter();

  const onClickPageBack = () => {
    router.back();
  };

  return (
    <button
      className="flex-shrink-0"
      type="button"
      onClick={onClickPageBack}
      aria-label="前のページに戻る"
    >
      <Icon name="navigateBefore" />
    </button>
  );
};
export default PageBack;
