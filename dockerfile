# --- ビルドステージ ---
FROM --platform=linux/amd64 node:18-slim AS builder

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のコピーとインストール
COPY package*.json ./
RUN npm install && npm cache clean --force

# アプリケーションのソースをコピー
COPY . .

# アプリをビルド
RUN npm run build

# --- 実行ステージ ---
FROM --platform=linux/amd64 node:18-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のコピーとインストール
# 本番環境用に依存関係のみをインストール, キャッシュを削除
COPY package*.json ./
RUN npm install --only=production && npm cache clean --force

# ビルドステージからビルドされたファイルをコピー
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# ポート3000をエクスポーズ
EXPOSE 3000

# アプリを実行
CMD ["npm", "start"]
