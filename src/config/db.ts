import type { LogEvent } from "kysely";
import {
  CamelCasePlugin,
  DeduplicateJoinsPlugin,
  Kysely,
  PostgresDialect,
} from "kysely";
import pg from "pg";
import type { DB } from "../database-schemas";
import { getDbConnectionString, getDbSslConfig } from "./database-url";
import { env } from "./env";
import { logger } from "./logger";

const { Pool } = pg;

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: getDbConnectionString(),
    max: 20,
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    allowExitOnIdle: false,
    application_name: "tg-wordgame",
    ssl: getDbSslConfig(),
  }),
});

export const db = new Kysely<DB>({
  dialect,
  plugins: [
    new CamelCasePlugin(),
    new DeduplicateJoinsPlugin(),
  ],
  log(event: LogEvent) {
    if (event.level === "error") {
      logger.error("Database query failed", {
        error: event.error,
        query: event.query,
      });
    }
  },
});
