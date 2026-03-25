import type { NewTodo, UpdateTodo } from '@/db/validator';

import { deleteTodoById, insertNewTodo, isTodo, selectTodoById, selectTodos, updateTodoById } from '@/db/queries/todos';
import { HTTPResponseError } from '@/lib/http';

export const create = async (newTodo: NewTodo) => {
  const todo = await insertNewTodo(newTodo);

  return todo;
};

export const read = async () => {
  const todos = await selectTodos();

  return todos;
};

export const readOne = async (id: number, url: string) => {
  const todo = await selectTodoById(id);

  if (!todo) throw new HTTPResponseError('NotFound', { message: 'Todo Not Found', url });

  return todo;
};

export const updateOne = async (id: number, values: UpdateTodo, url: string) => {
  const exist = await isTodo(id);
  if (!exist) throw new HTTPResponseError('NotFound', { message: 'Todo Not Found', url });

  const bodyEmpty = Object.keys(values).length === 0;
  if (bodyEmpty) throw new HTTPResponseError('BadRequest', 'No Body');

  const todo = await updateTodoById(id, values);

  return todo!;
};

export const deleteOne = async (id: number, url: string) => {
  const exist = await isTodo(id);
  if (!exist) throw new HTTPResponseError('NotFound', { message: 'Todo Not Found', url });

  await deleteTodoById(id);
};
