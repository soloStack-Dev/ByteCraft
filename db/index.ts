import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

const toNum = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

function requireUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not configured. Add it to .env.local (e.g. mysql://user:pass@host:3306/bytecraft) before using the database."
    );
  }
  return url;
}

const DEFAULT_SCHEMA = { schema } as unknown as NonNullable<
  Parameters<typeof drizzle>[1]
>;

let poolInstance: mysql.Pool | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

/**
 * ORM database instance (mysql2 pool owned by drizzle), created lazily.
 *
 * NOTE on this RC version of drizzle: `DrizzleMySqlConfig` omits `schema` in
 * its types but the runtime DOES honor it, hence the assertion above.
 */
export function getDb() {
  if (!dbInstance) {
    dbInstance = drizzle(requireUrl(), DEFAULT_SCHEMA);
  }
  return dbInstance;
}

/**
 * Dedicated small pool used by the readiness health check, kept separate so
 * health probes never consume app-facing connection slots.
 */
export function getPool(): mysql.Pool {
  if (!poolInstance) {
    poolInstance = mysql.createPool({
      uri: requireUrl(),
      connectionLimit: toNum(process.env.DB_POOL_CONNECTION_LIMIT, 5),
      idleTimeout: 60000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return poolInstance;
}

export async function getConnection() {
  return await getPool().getConnection();
}

export { schema };
