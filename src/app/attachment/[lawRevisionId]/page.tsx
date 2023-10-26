import ImageBlock from "@/components/elements/ImageBlock";
import ErrorMessageBlock from "@/components/search-result/error-message-block";
import { getAttachment } from "@/lib/api/get-attachment";
import logger from "@/lib/utils/logger";

/**
 * 添付ファイルページ
 * @returns {JSX.Element} 添付ファイルページ
 */
export default async function Attachment({
  params,
  searchParams,
}: {
  params: { lawRevisionId: string };
  searchParams: { src: string };
}) {
  logger.info({
    message: "[attachment]",
  });

  const result = await getAttachment({
    lawRevisionId: params.lawRevisionId,
    src: searchParams.src,
  });

  // データ取得処理 エラー時の表示
  if (!result.isSuccess)
    return <ErrorMessageBlock message={result.error.message} />;

  const buffer = await result.value.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString("base64");

  return (
    <div className="col-span-12">
      <h1>添付ファイルページ</h1>
      <ImageBlock base64Image={base64Image} />
    </div>
  );
}
