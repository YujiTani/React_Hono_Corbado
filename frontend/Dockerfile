FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

# 本番環境用の環境変数設定
ENV NODE_ENV=production
ENV PORT=3000

# 本番環境ではnpm run previewを使用
CMD ["npm", "run", "preview"]
