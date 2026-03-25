import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { todosTable } from '@/db/schema';

import { DATABASE_URL } from './env';

const pool = new Pool({
  connectionString: DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 10 * 1000, // 10 seconds
  connectionTimeoutMillis: 30 * 1000, // 30 seconds
});

const db = drizzle({
  client: pool,
  casing: 'snake_case',
  schema: {
    todos: todosTable,
  },
});

export default db;
