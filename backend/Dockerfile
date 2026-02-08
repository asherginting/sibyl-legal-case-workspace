FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN corepack enable && pnpm install

COPY . .

RUN pnpm prisma generate
RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]
