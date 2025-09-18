import { uuid, pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const userSession = pgTable("session_table", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .references(() => 
      usersTable.id
    )
    .notNull(),
  createAt: timestamp().defaultNow().notNull(),
});
