import { serveStatic } from 'hono/bun';

import createApp from '@/lib/create-app';

import todosRoute from './routes/todos';

const app = createApp();

const _apiRoute = app.basePath('/api').route('/todos', todosRoute);

app.get('*', serveStatic({ root: './client/dist' }));
app.get('*', serveStatic({ path: './client/dist/index.html' }));

export default app;

export type ApiRouteType = typeof _apiRoute;
