import type { Context } from 'hono';

import type { AppEnv } from '@/types/app-env';

import { HTTPResponseError, HTTPStatusCode } from '@/lib/http';

interface ErrorResponseBody {
  success: false;
  name: string;
  message: string;
  error: unknown;
}

export const errorHandler = (e: Error, c: Context<AppEnv>) => {
  if (e instanceof HTTPResponseError) {
    return c.json(
      {
        success: false,
        name: e.name,
        message: e.message,
        error: e.data,
      } satisfies ErrorResponseBody,
      e.status,
    );
  }

  c.var.logger.error(e);

  return c.json(
    {
      success: false,
      name: e.name,
      message: e.message || 'Internal Server Error',
      error: e,
    } satisfies ErrorResponseBody,
    HTTPStatusCode.InternalServerError,
  );
};
