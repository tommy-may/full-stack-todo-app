import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import prettier from 'eslint-plugin-prettier/recommended';
import { type Config, defineConfig as defaultDefineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export const defineConfig = (...args: Config[]) =>
  defaultDefineConfig([
    {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
      plugins: { js },
      extends: ['js/recommended'],
    },
    tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
    {
      plugins: { perfectionist },
      rules: {
        'perfectionist/sort-exports': ['error', { type: 'alphabetical' }],
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'alphabetical',
            order: 'asc',
            fallbackSort: { type: 'unsorted' },
            ignoreCase: true,
            specialCharacters: 'keep',
            sortBy: 'path',
            internalPattern: ['^~/.+', '^@/.+'],
            partitionByComment: false,
            partitionByNewLine: false,
            newlinesBetween: 1,
            newlinesInside: 0,
            maxLineLength: undefined,
            groups: [
              'type-import',
              ['value-builtin', 'value-external'],
              'type-internal',
              'value-internal',
              ['type-parent', 'type-sibling', 'type-index'],
              ['value-parent', 'value-sibling', 'value-index'],
              'ts-equals-import',
              'unknown',
            ],
            customGroups: [],
            environment: 'node',
            useExperimentalDependencyDetection: true,
          },
        ],
        'perfectionist/sort-jsx-props': ['error', { type: 'alphabetical' }],
        'perfectionist/sort-named-exports': ['error', { type: 'alphabetical' }],
        'perfectionist/sort-named-imports': ['error', { type: 'alphabetical' }],
      },
    },
    {
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            disallowTypeAnnotations: false,
            fixStyle: 'separate-type-imports',
            prefer: 'type-imports',
          },
        ],
      },
    },
    ...args,
    prettier,
  ]);
