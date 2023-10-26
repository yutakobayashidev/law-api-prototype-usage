import logger from "@/lib/utils/logger";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "詳細検索画面 | 公開UI",
  description: "本ページの説明文",
};

/**
 * 詳細検索ページ
 * @returns {JSX.Element} 詳細検索ページ
 */
export default function LawList() {
  logger.info({
    message: "[law-list]",
  });
  return <></>;
}
