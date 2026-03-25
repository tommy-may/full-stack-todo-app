import { desc, eq } from 'drizzle-orm';

import db from '@/db';

import type { NewTodo, UpdateTodo } from '../validator';

import { todosTable } from '../schema';

export const isTodo = async (id: number) => {
  const res = await db.query.todos.findFirst({
    where: eq(todosTable.id, id),
    columns: { id: true },
  });

  return !!res;
};

export const insertNewTodo = async (newTodo: NewTodo) => {
  const [res] = await db.insert(todosTable).values(newTodo).returning();

  return res!;
};

export const selectTodos = async () => {
  const res = await db.query.todos.findMany({
    orderBy: desc(todosTable.createdAt),
  });

  return res;
};

export const selectTodoById = async (id: number) => {
  const res = await db.query.todos.findFirst({
    where: eq(todosTable.id, id),
  });

  return res;
};

export const updateTodoById = async (id: number, values: UpdateTodo) => {
  const [res] = await db.update(todosTable).set(values).where(eq(todosTable.id, id)).returning();

  return res;
};

export const deleteTodoById = async (id: number) => {
  await db.delete(todosTable).where(eq(todosTable.id, id));
};
