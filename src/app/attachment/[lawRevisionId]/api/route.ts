import { validateRequest } from "@/lib/utils/zod-schemas/common-schema";
import { GetAttachedRequest } from "@/lib/typescript-fetch";
import { RequestAttachedParamsSchema } from "@/lib/utils/zod-schemas/request-attached-params-schema";
import { fetchAttachment } from "@/lib/api/get-attachment";
import logger from "@/lib/utils/logger";

/**
 * APIルート 添付ファイル取得API (/attachment/[lawRevisionId]/api?src=xxx)
 * クライアントサイドから添付ファイルの取得を行う際に利用
 * 添付画像ファイルのデータ(blob)を取得する
 * リクエストパラメータにsrcがない場合は、lawRevisionIdに紐づく全ての添付ファイルのzipを返却する
 * @param {Request} request
 * @param params.lawRevisionId 法令改正ID
 * @returns {Response} response
 *
 * 利用対象API: /attached (GET) - 添付画像ファイル取得API
 * - APIエンドポイント [API_URL]/attached
 * - リクエストメソッド: GET
 * - リクエストパラメータ: params（検索条件）
 *
 * 本データ取得処理は、@interface {GetAttachedRequest} のパラメータのうち、
 * @param {GetAttachedRequest} に記載している以下のパラメータを利用し、添付ファイルの画像データを取得しています。
 * lawRevisionId(法令履歴ID)
 * src(添付ファイルのパス)
 *
 * - レスポンス: 添付ファイルの画像データ（Blob）
 * - エラーハンドリング: リファラチェックエラー時はステータスコード403,バリデーションエラー時は400,エラー時は500を返却
 * - 依存関係: 環境変数（process.env.API_URL）からAPIのBase URLを取得
 * - クライアントコード生成: OpenAPI Generatorを利用して生成(TypeScript-fetch)
 */
export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      lawRevisionId: string;
    };
  }
) {
  // リファラチェック(APIルートに直接のアクセスを簡易的に防ぐ)
  const referer = request.headers.get("Referer") ?? "";
  if (!referer.startsWith(process.env.APP_BASE_URL ?? "")) {
    return new Response("Forbidden", { status: 403 });
  }

  // リクエストパラメータの取得
  const { searchParams } = new URL(request.url);
  // クエリパラメータとして利用するパラメータを取得
  const query = {
    lawRevisionId: params.lawRevisionId,
    src: searchParams.get("src") ?? "",
  };

  // クエリのバリデーションチェック
  const validateResult = validateRequest<GetAttachedRequest>({
    schema: RequestAttachedParamsSchema,
    params: query,
  });
  if (!validateResult.isSuccess) {
    return new Response(validateResult.error.message, { status: 400 });
  }

  try {
    // fetchAttachment関数 内部で添付ファイル取得API(/attached)を呼び出し、リクエスト
    const result = await fetchAttachment(query);
    // レスポンスの生成(成功時)
    return new Response(result);
  } catch (error) {
    logger.error({
      message: "[attachment/api] API error",
      error: error,
      query: query,
    });
    // レスポンスの生成(エラー時)
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
