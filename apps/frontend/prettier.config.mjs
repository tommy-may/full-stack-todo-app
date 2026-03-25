import { addConfig } from '@prettier-config/recommended';

export default addConfig({
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/index.css',
  tailwindFunctions: ['cn', 'cva'],
});
