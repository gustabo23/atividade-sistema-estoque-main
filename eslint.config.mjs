import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  { ignores: ['build/**', 'node_modules/**'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['src/**/*.ts'],
    rules: {
      'max-params': ['error', 4],
      complexity: ['error', 12],

      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/typedef': ['error', { parameter: true }],

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
    },
  },

  {
    files: ['src/database/migrations/**/*.js', 'src/database/seeders/**/*.js'],
    languageOptions: { sourceType: 'commonjs', globals: { process: 'readonly' } },
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },

  prettier,
);
