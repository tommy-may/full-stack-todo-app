import type { Context } from 'hono';

import { HTTPStatusCode } from '@/lib/http';

export const notFoundHandler = (c: Context) => c.text(`Route Not Found \`${c.req.path}\` `, HTTPStatusCode.NotFound);
