# MBTI わたしの取説占い

MBTIタイプ別に読む月次占いの静的サイトです。

## プロジェクト構成

```
mbti-torisetsu/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # 共通レイアウト
│   ├── page.tsx              # トップページ
│   ├── globals.css           # グローバルCSS
│   └── [year]/[month]/       # 動的ルート
│       ├── page.tsx          # 月ページ
│       └── [type]/
│           └── page.tsx      # タイプページ
├── data/                     # データファイル
│   ├── site.json             # サイト設定
│   ├── types.json            # MBTIタイプ情報
│   ├── years/                # 年ごとのテーマ
│   │   └── 2026.json
│   └── months/               # 月ごとのテーマ
│       └── 02.json
├── content/                  # Markdownコンテンツ
│   └── 2026/02/
│       ├── INFP.md
│       ├── ESTJ.md
│       └── INFJ.md
├── lib/                      # ユーティリティ関数
│   └── data.ts
└── public/                   # 静的ファイル
    └── images/types/         # タイプアイコン画像
```

## セットアップ

1. 依存パッケージのインストール:
```bash
npm install
```

2. 開発サーバーの起動:
```bash
npm run dev
```

3. ブラウザで確認:
```
http://localhost:3000
```

## ビルド（静的サイト生成）

```bash
npm run build
```

ビルド後、`out/` ディレクトリに静的ファイルが生成されます。

## コンテンツの追加方法

### 新しいタイプを追加

1. `data/types.json` にタイプ情報を追加
2. `content/[年]/[月]/[タイプ名].md` にMarkdownファイルを作成

### 新しい月を追加

1. `data/months/[MM].json` に月のテーマを追加（オプション）
2. `content/[年]/[MM]/` ディレクトリを作成
3. 各タイプのMarkdownファイルを追加

### 新しい年を追加

1. `data/years/[YYYY].json` に年のテーマを追加（オプション）
2. `content/[年]/` ディレクトリを作成
3. 月ごとのディレクトリとコンテンツを追加

## Markdownファイルの構成

各タイプのMarkdownファイルは以下の見出し構成を推奨します：

```markdown
# 今月の空気

（本文）

## わたしが引っかかりやすいところ

（本文）

## ひとつの見方

（本文）

## ことばの贈り物

> 「引用文」

（本文）
```

## ルーティング

- `/` - トップページ（最新月へのリンク）
- `/[year]/[month]/` - 月ページ（タイプ一覧）
- `/[year]/[month]/[type]/` - タイプページ（詳細コンテンツ）

例:
- `/2026/2/` - 2026年2月の月ページ
- `/2026/2/INFP/` - 2026年2月のINFPページ

## 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: CSS (シンプルな白基調デザイン)
- **Markdownパース**: remark + remark-html
- **ビルド**: 静的サイト生成 (SSG)

## カスタマイズ

- サイト名やデフォルト年月: `data/site.json`
- スタイル: `app/globals.css`
- タイプ情報: `data/types.json`

## ライセンス

このプロジェクトは私的利用のためのものです。
