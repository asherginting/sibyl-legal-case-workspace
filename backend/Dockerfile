FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm migrate:deploy

RUN pnpm seed

RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]
