FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN pnpm build

EXPOSE 4000

CMD ["sh", "-c", "npx prisma db seed || true && pnpm start"]
