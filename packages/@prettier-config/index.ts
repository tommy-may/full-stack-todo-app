import type { Config } from 'prettier';

export const addConfig = (config?: Config): Config => ({
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  objectWrap: 'preserve',
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: true,

  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 100,
      },
    },
  ],

  ...config,
});
