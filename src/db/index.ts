import "@tanstack/react-start/server-only";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as authSchema from "./auth_schema.ts";
import * as applicationSchema from "./schema.ts";

const schema = { ...applicationSchema, ...authSchema };

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & { pgPool?: Pool };
const pool = globalForDb.pgPool ?? new Pool({ connectionString });

if (process.env.NODE_ENV !== "production") {
  globalForDb.pgPool = pool;
}

export const db = drizzle(pool, { schema });
