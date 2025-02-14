# ベースイメージとしてNode.jsの最新のLTSバージョンを使用
FROM node:20

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# アプリケーションを実行するためのポートを指定
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "run", "dev"]
