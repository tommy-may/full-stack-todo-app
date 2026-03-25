import { NewTodoSchema, UpdateTodoSchema } from '@/db/validator';
import { createRoute, ok } from '@/lib/create-app';
import { HTTPStatusCode } from '@/lib/http';
import { validator } from '@/middlewares/validator';
import { create, deleteOne, read, readOne, updateOne } from '@/services/todos';

// eslint-disable-next-line drizzle/enforce-delete-with-where
const todosRoute = createRoute()
  .post('/', validator('json', NewTodoSchema), async (c) => {
    const todo = await create(c.req.valid('json'));

    return c.json(ok(todo), HTTPStatusCode.Created);
  })
  .get('/', async (c) => {
    const todos = await read();

    return c.json(ok(todos));
  })
  .get('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const todo = await readOne(id, c.req.path);

    return c.json(ok(todo));
  })
  .patch('/:id{[0-9]+}', validator('json', UpdateTodoSchema), async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    const todo = await updateOne(id, c.req.valid('json'), c.req.path);

    return c.json(ok(todo));
  })
  .delete('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'));

    await deleteOne(id, c.req.path);

    return c.json(ok(id));
  });

export default todosRoute;
