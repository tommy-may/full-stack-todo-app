import { defineConfig } from '@eslint-config/recommended';
import drizzle from 'eslint-plugin-drizzle';

export default defineConfig([
  {
    ignores: ['eslint.config.mjs', 'prettier.config.mjs'],
  },
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: { drizzle },
    rules: {
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error',
    },
  },
]);
