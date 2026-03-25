import type { NewTodo, UpdateTodo } from '@backend/server';

import { queryOptions } from '@tanstack/react-query';

import api from '@/lib/api';

export const createNewTodo = async (values: NewTodo) => {
  const res = await api.todos.$post({
    json: values,
  });

  if (!res.ok) throw new Error('Server Error');

  const data = await res.json();

  return data.data;
};

export const readTodos = async () => {
  const res = await api.todos.$get();

  if (!res.ok) throw new Error('Server Error');

  const data = await res.json();

  return data.data;
};

export const updateTodoById = async ({ id, values }: { id: number; values: UpdateTodo }) => {
  const res = await api.todos[':id{[0-9]+}'].$patch({
    param: { id: id.toString() },
    json: values,
  });

  if (!res.ok) throw new Error('Server Error');

  const data = await res.json();

  return data.data;
};

export const deleteTodoById = async (id: number) => {
  const res = await api.todos[':id{[0-9]+}'].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) throw new Error('Server Error');
};

export const createNewTodoLoadingQueryOptions = queryOptions<{ loading: boolean }>({
  queryKey: ['create-new-todo-loading'],
  queryFn: () => ({ loading: false }),
  staleTime: Infinity,
});

export const readTodosQueryOptions = queryOptions({
  queryKey: ['read-todos'],
  queryFn: readTodos,
  staleTime: Infinity,
});
