import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // 通常のアプリケーション接続にはDATABASE_URLを使用する
    // url: env("DATABASE_URL"),
    // DIRECT_URLはマイグレーション用に使用する
    url: env("DIRECT_URL"),
  },
});
