import type { ValidationTargets } from 'hono';
import type { z } from 'zod';

import { zValidator } from '@hono/zod-validator';

import { HTTPResponseError } from '@/lib/http';

export const validator = <T extends z.ZodSchema, Target extends keyof ValidationTargets>(target: Target, schema: T) =>
  zValidator(target, schema, (result) => {
    if (!result.success) {
      throw new HTTPResponseError('BadRequest', result.error.message, {
        data: {
          issues: result.error.issues,
        },
      });
    }
  });
