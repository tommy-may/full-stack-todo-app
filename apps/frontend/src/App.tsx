import type { Todo } from '@backend/server';

import { RiCloseLine, RiSpaceShip2Line } from '@remixicon/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useId, useState } from 'react';
import { toast } from 'sonner';

import type { ReplaceDateWithString } from '@/types';

import { createNewTodoLoadingQueryOptions, deleteTodoById, readTodosQueryOptions, updateTodoById } from '@/api/todos';
import { NewTodoForm } from '@/components/form/new-todo-form';
import {
  Badge,
  Button,
  Checkbox,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldLabel,
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
  Progress,
  Skeleton,
  Spinner,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { dateToString } from '@/lib/utils';

export const App = () => {
  const todos = useQuery(readTodosQueryOptions);
  const createNewTodoLoading = useQuery(createNewTodoLoadingQueryOptions);

  const [tabValue, setTabValue] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (!todos.error) return;

    toast.error('Failed to read to-do(s)', { position: 'top-left' });
  }, [todos.error]);

  const todosLength = todos.data?.length || 0;
  const completed = todos.data?.filter((t) => t.completed).length || 0;
  const progressValue = todosLength === 0 ? 0 : Math.floor((completed / todosLength) * 100);

  const displayedTodos = todos.data?.filter((t) =>
    tabValue === 'completed' ? t.completed : tabValue === 'active' ? !t.completed : t,
  );

  return (
    <div className='flex min-h-screen p-11'>
      <div className='m-auto w-full max-w-md space-y-6 border p-5 md:max-w-2xl'>
        <div className='space-y-2'>
          <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight text-balance'>
            Your <br />
            <span className='text-primary'>to-do</span> list
          </h1>
          <p className='text-sm text-muted-foreground'>{dateToString()}</p>
        </div>

        <ProgressComponent value={progressValue} />

        <NewTodoForm />

        <Tabs
          defaultValue='all'
          value={tabValue}
        >
          <TabsList
            className='w-full md:w-fit'
            variant='line'
          >
            <TabsTrigger
              className='cursor-pointer'
              onClick={() => setTabValue('all')}
              value='all'
            >
              All <Badge variant='outline'>{todosLength}</Badge>
            </TabsTrigger>
            <TabsTrigger
              className='cursor-pointer'
              onClick={() => setTabValue('active')}
              value='active'
            >
              Active <Badge variant='outline'>{todosLength - completed}</Badge>
            </TabsTrigger>
            <TabsTrigger
              className='cursor-pointer'
              onClick={() => setTabValue('completed')}
              value='completed'
            >
              Completed <Badge variant='outline'>{completed}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className='space-y-3'>
          {createNewTodoLoading.data?.loading && ['all', 'active'].includes(tabValue) && <Skeleton className='h-7' />}

          {todos.isPending && (
            <>
              <Skeleton className='h-7' />
              <Skeleton className='h-7' />
              <Skeleton className='h-7' />
            </>
          )}

          {displayedTodos?.map((todo) => (
            <TodoComponent
              key={todo.id}
              {...todo}
            />
          ))}

          {todos.isFetched && !todos.data?.length && <NoDataComponent />}
        </div>
      </div>
    </div>
  );
};

const ProgressComponent = ({ value }: { value: number }) => {
  const progressId = useId();

  return (
    <Field
      className='w-full'
      orientation='horizontal'
    >
      <FieldLabel
        className='text-muted-foreground'
        htmlFor={progressId}
      >
        <span>{value}%</span>
      </FieldLabel>
      <Progress
        id={progressId}
        value={value}
      />
    </Field>
  );
};

const TodoComponent = ({ id, title, completed }: ReplaceDateWithString<Todo>) => {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: updateTodoById,
    onError: () => {
      toast.error('Failed to update to-do', { position: 'top-left' });
    },
    onSuccess: (data) => {
      qc.setQueryData(readTodosQueryOptions.queryKey, (existing) => existing!.map((e) => (e.id === id ? data : e)));
    },
  });

  const doMutation = () => {
    if (mutation.isPending) return;

    mutation.mutate({ id: id, values: { completed: !completed } });
  };

  return (
    <Item variant='muted'>
      <ItemContent
        aria-disabled={mutation.isPending}
        className='cursor-pointer flex-row items-center space-x-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'
        onClick={doMutation}
      >
        <Checkbox
          checked={completed}
          className='cursor-pointer'
          disabled={mutation.isPending}
          onCheckedChange={doMutation}
        />
        <ItemTitle
          aria-checked={completed}
          className='aria-checked:text-muted-foreground aria-checked:line-through'
        >
          {title}
        </ItemTitle>
      </ItemContent>
      <ItemActions>
        <DeleteTodoButton id={id} />
      </ItemActions>
    </Item>
  );
};

const DeleteTodoButton = ({ id }: { id: number }) => {
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteTodoById,
    onError: () => {
      toast.error('Failed to delete to-do', { position: 'top-left' });
    },
    onSuccess: () => {
      qc.setQueryData(readTodosQueryOptions.queryKey, (existing) => existing!.filter((e) => e.id !== id));
    },
  });

  return (
    <Button
      className='cursor-pointer'
      disabled={mutation.isPending}
      onClick={() => mutation.mutate(id)}
      size='icon'
      variant='ghost'
    >
      {mutation.isPending ? <Spinner /> : <RiCloseLine />}
    </Button>
  );
};

const NoDataComponent = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <RiSpaceShip2Line />
        </EmptyMedia>
        <EmptyTitle>No To-do(s)</EmptyTitle>
        <EmptyDescription>Add new to-do for the day</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};
