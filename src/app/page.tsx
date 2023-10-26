import logger from "@/lib/utils/logger";
import { redirect } from "next/navigation";

/**
 * トップ画面
 * @returns {JSX.Element} トップ画面 コンポーネント
 */
export default async function Home() {
  logger.info({
    message: "[home]",
  });
  redirect("/keyword");
}
