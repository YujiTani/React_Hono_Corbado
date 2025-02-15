FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

# 本番環境用の環境変数設定
ENV NODE_ENV=production
ENV PORT=3001

CMD ["npm", "start"]
