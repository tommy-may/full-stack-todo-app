import { z } from 'zod';

const optional = <S extends z.core.SomeType>(schema: S) => z.preprocess((v) => (v === '' ? undefined : v), schema);

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  PORT: optional(z.coerce.number().min(0).max(65535).default(3000)),
  LOG_LEVEL: optional(z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info')),

  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().min(0).max(65535).default(5432),
  DB_NAME: z.string(),

  DATABASE_URL: z.url(),
});

const { data: env, error, success } = EnvSchema.safeParse(process.env);

if (!success) {
  const NODE_ENV = process.env.NODE_ENV!;

  console.error(`Error parsing \`.env.${NODE_ENV}\` file:`);
  console.error(JSON.stringify(z.treeifyError(error).properties, null, 2));

  process.exit(1);
}

export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT;
export const LOG_LEVEL = env.LOG_LEVEL;

export const DATABASE_URL = env.DATABASE_URL;
