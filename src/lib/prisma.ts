import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";

const connectionString =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";

// 接続文字列が存在しない場合はエラーをスロー
if (!connectionString) {
  throw new Error(
    "DIRECT_URL or DATABASE_URL must be set to initialize PrismaClient.",
  );
}

// グローバルスコープにPrismaClientとPoolをキャッシュして、ホットリロード時の再初期化を防ぐ
type GlobalWithPrisma = typeof globalThis & {
  prisma?: PrismaClient;
  prismaPool?: Pool;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

const prismaPool = globalForPrisma.prismaPool ?? new Pool({ connectionString });
const adapter = new PrismaPg(prismaPool);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = prismaPool;
}
