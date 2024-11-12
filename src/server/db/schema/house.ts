import { numeric, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { owner } from "./owner";

export const houseTypeEnum = pgEnum('house_type', ['independent', 'flat', 'duplex', 'studio'])
export const negotiableEnum = pgEnum('negotiable', ['yes', 'maybe', 'no'])
export const statusEnum = pgEnum('status', ['active', 'inactive'])

export const house = pgTable("house", {
  id: uuid("id").primaryKey(),
  houseType: houseTypeEnum(),
  city: text("city").notNull(),
  area: text("area").notNull(),
  state: text("state").notNull(),
  country: text("country").notNull(),
  price: numeric("price").notNull(),
  negotiable: negotiableEnum(),
  status: statusEnum(),
  ownerId: uuid("owner_id").notNull().references(() => owner.id, { onDelete: 'cascade' })
})

export type SelectBlogs = typeof house.$inferSelect
export type InsertBlogs = typeof house.$inferInsert
