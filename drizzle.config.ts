import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/server/db/schema",
  out: "./src/server/db/migrations/",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL!,
  }
});
