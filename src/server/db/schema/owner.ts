import { numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const owner = pgTable("owner", {
  name: text("name").notNull(),
  address: text("address").notNull(),
  email: text("email").notNull(),
  phone: numeric("phone").notNull().primaryKey(),
})

export type SelectOwner = typeof owner.$inferSelect
export type InsertOwner = typeof owner.$inferInsert
