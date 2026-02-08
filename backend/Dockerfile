FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN corepack enable && pnpm install

COPY . .

EXPOSE 4000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && pnpm build && pnpm start"]
