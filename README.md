# 法令 API プロトタイプ利用アプリサンプル

clone: https://www.digital.go.jp/policies/legal-practice/public-test

## 概要

本サンプルは、「**法令 API プロトタイプ**」を利用して法令データを検索、閲覧できる Web アプリケーションのサンプルです。

本サンプルでは、以下の操作を行うことができます。

<ol>
    <li>キーワード検索
        <ul>
            <li>時点指定</li>
        </ul>
    </li>
    <li>詳細検索
        <ul>
            <li>法令名または法令番号の指定</li>
            <li>法令種別の指定</li>
            <li>時点指定</li>
            <li>公布日範囲指定</li>
            <li>法令分類の指定</li>  
            <li>データ更新日の範囲指定</li>
        </ul>
    <li>法令データの確認</li>
    <li>条文沿革の確認</li>
    <li>添付画像の表示</li>  
    </li>
</ol>

各操作の説明は、[docs/manual.md](./docs/manual.md)を参照してください。

## デモ環境

本サンプルのデモ環境は下記のページの「法令 API プロトタイプ公開テスト利用マニュアル」の「3.API プロトタイプ利用サンプル」をご覧ください。

[法令 API プロトタイプ公開テストを開催します｜デジタル庁](https://www.digital.go.jp/policies/legal-practice/public-test)

## 前提条件

本プロジェクトをローカル環境で実行する場合、以下の環境が必要です。

- [Node.js](https://nodejs.org/)（v18.16.0 以上）
- [npm](https://www.npmjs.com/)（v9.7.1 以上）または [yarn](https://yarnpkg.com/)（v1.22.19 以上）

## インストール

依存関係のライブラリをインストールします。

```sh
npm install
```

yarn の場合は以下のとおりです。

```sh
yarn install
```

### 環境変数の設定

`.env.local`ファイルをプロジェクトのルートに新たに作成し、環境変数を設定します。  
環境変数については、`.env.local.sample`ファイルを参照してください。

```env
NEXT_PUBLIC_APP_BASE_URL="アプリケーションのベースURL (ex. https://localhost:3000)"
NEXT_PUBLIC_API_SPECIFICATION_URL="API仕様書(SwaggerUI)のページのパス"
API_URL="APIのパス"
```

## 起動方法

本サンプルの起動方法は以下のとおりです。

npm の場合は以下のコマンドを実行します。

```sh
npm run dev
```

yarn の場合は以下のコマンドを実行します。

```sh
yarn dev
```

ブラウザで`http://localhost:3000` にアクセスします（デフォルトは、3000 ポートです）。  
3000 ポートが既に使用されている場合は、以下の手順で別のポートを指定して起動します。

### 起動ポートの変更方法

起動ポートを変更する場合、起動コマンドにポート指定のオプションをつける必要があります。  
ポートを 4000 で起動したい場合、`package.json`の scripts の dev コマンドを以下のように変更します。

```json
  "scripts": {
    "dev": "next dev -p 4000",
    ...
  }
```

### ポートを環境変数に設定する場合

以下の手順でポート番号を環境変数に設定して起動することも可能です。

`.env.localファイル`に`APP_PORT`を追加し、ポート番号を指定します。

```env
APP_PORT=4000
...
```

#### 利用 OS が Windows の場合

ここでは、dotenv-cli と cross-var を利用して環境変数を読み込む方法を紹介します。

npm の場合は以下のコマンドを実行します。

```sh
npm install --save-dev dotenv-cli cross-var
```

yarn の場合は以下のコマンドを実行します。

```sh
yarn add -D dotenv-cli cross-var
```

`package.json`を以下のように変更します。

```json
  "scripts": {
    "dev": "dotenv -e .env.local -- cross-var next dev --port $APP_PORT",
    ...
  }
```

#### 利用 OS が Mac の場合

`package.json`を以下のように変更します。

```json
  "scripts": {
    "dev": "source .env.local && next dev --port $APP_PORT",
    ...
  }
```

## ビルド方法

本サンプルのビルド方法は以下です。

npm の場合は以下のコマンドを実行します。

```sh
npm run build
```

yarn の場合は以下のコマンドを実行します。

```sh
yarn build
```

## ユーザーマニュアル

本サンプルのユーザーマニュアルは、[docs/manual.md](./docs/manual.md) にあります。  
また、[docsify](https://docsify.js.org/#/)を利用し、以下のコマンドでユーザーマニュアルを Web ページとして閲覧することができます。

```sh
docsify serve docs
```

## ライセンス

このプロジェクトは MIT ライセンスのもとでライセンスされています。  
詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 依存関係のライブラリについて

本サンプルは、オープンソースソフトウェアを利用しています。  
利用ソフトウェアの著作権情報については、[COPYRIGHT_THIRD_PARTY_SOFTWARE_NOTICE.md](./COPYRIGHT_THIRD_PARTY_SOFTWARE_NOTICE.md) を参照してください。

---

<div align="center">Copyright (c) 2023 Digital Agency</div>
