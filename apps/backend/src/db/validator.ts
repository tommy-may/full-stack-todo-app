import type z from 'zod';

import { createInsertSchema } from 'drizzle-zod';

import { todosTable } from './schema';

export type Todo = typeof todosTable.$inferSelect;

export type NewTodo = z.infer<typeof NewTodoSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;

export const NewTodoSchema = createInsertSchema(todosTable, {
  title: (field) => field.min(3).max(255),
}).omit({ createdAt: true, updatedAt: true });

export const UpdateTodoSchema = NewTodoSchema.partial();
