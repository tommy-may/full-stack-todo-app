import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { requestId } from 'hono/request-id';

import type { AppEnv } from '@/types/app-env';

import { errorHandler } from '@/middlewares/error';
import { notFoundHandler } from '@/middlewares/not-found';
import { pinoLogger } from '@/middlewares/pino-logger';

interface ResponseBody<D> {
  success: true;
  data: D;
}

export const createRoute = () => new Hono<AppEnv>({ strict: false });
export const ok = <D>(data: D): ResponseBody<D> => ({ success: true, data });

const createApp = () =>
  createRoute().use('*', cors()).use(requestId()).use(pinoLogger).notFound(notFoundHandler).onError(errorHandler);

export default createApp;
