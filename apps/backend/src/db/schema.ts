import * as t from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: t
    .timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: t
    .timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date())
    .notNull(),
};

export const todosTable = t.pgTable('todos', {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  title: t.varchar({ length: 255 }).notNull(),
  completed: t.boolean().default(false).notNull(),
  ...timestamps,
});
