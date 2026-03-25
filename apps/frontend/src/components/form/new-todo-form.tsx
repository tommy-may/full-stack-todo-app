import { NewTodoSchema } from '@backend/server';
import { RiAddLine } from '@remixicon/react';
import { useForm } from '@tanstack/react-form';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import { createNewTodo, createNewTodoLoadingQueryOptions, readTodosQueryOptions } from '@/api/todos';
import {
  Field,
  FieldError,
  FieldGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui';

export const NewTodoForm = () => {
  const qc = useQueryClient();

  const [disabled, setDisabled] = useState(false);

  const form = useForm({
    defaultValues: { title: '' },
    validators: { onSubmit: NewTodoSchema },
    onSubmit: async ({ value }) => {
      setDisabled(true);
      qc.setQueryData(createNewTodoLoadingQueryOptions.queryKey, { loading: true });

      try {
        const todo = await createNewTodo(value);

        qc.setQueryData(readTodosQueryOptions.queryKey, (existing) => [todo, ...existing!]);
      } catch {
        toast.error('Failed to create new to-do', { position: 'top-left' });
      } finally {
        form.reset();

        setDisabled(false);
        qc.setQueryData(createNewTodoLoadingQueryOptions.queryKey, { loading: false });
      }
    },
  });

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    void form.handleSubmit();
  };

  return (
    <form onSubmit={onSubmit}>
      <FieldGroup>
        <form.Field
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <InputGroup className='h-11'>
                  <InputGroupInput
                    aria-invalid={isInvalid}
                    autoComplete='off'
                    disabled={disabled}
                    id={field.name}
                    name={field.name}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Add new to-do...'
                    value={field.state.value}
                  />
                  <InputGroupAddon align='inline-end'>
                    <InputGroupButton
                      className='cursor-pointer'
                      disabled={disabled}
                      size='icon-sm'
                      type='submit'
                      variant='default'
                    >
                      <RiAddLine />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
          name='title'
        />
      </FieldGroup>
    </form>
  );
};
