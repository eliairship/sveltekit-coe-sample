import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const user = sqliteTable('user', {
	id: integer('id').primaryKey(),
  email: text('email').unique().notNull(),
  password: text('password').notNull()
});

export const profile = sqliteTable('profile', {
  id: integer('id').primaryKey(),
  email: text('email').unique().notNull(),
});
