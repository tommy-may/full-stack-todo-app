import type { Context, Next } from 'hono';

import logger from '@/lib/logger';

export const pinoLogger = async (c: Context, next: Next) => {
  const start = performance.now();

  const requestId = c.get('requestId');

  const child = logger.child({
    requestId,
    method: c.req.method,
    path: c.req.path,
  });

  c.set('logger', child);

  let body: unknown = undefined;

  try {
    if (c.req.header('content-type')?.includes('application/json')) {
      body = await c.req.json();
    }
  } catch {
    body = undefined;
  }

  child.info(
    {
      type: 'request',
      req: {
        method: c.req.method,
        url: c.req.url,
        path: c.req.path,
        query: c.req.query(),
        headers: Object.fromEntries(c.req.raw.headers),
        body,
      },
    },
    '<-',
  );

  await next();

  const responseTime = Math.round(performance.now() - start);

  const status = c.res.status;

  const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';
  child[level](
    {
      type: 'response',
      responseTime,
      res: {
        status,
        headers: Object.fromEntries(c.res.headers),
      },
    },
    '->',
  );
};
