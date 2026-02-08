import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default {
  ...eslintConfigPrettier,
  files: ['*.ts', '*.js', '*.mjs'],
  languageOptions: {
    globals: {
      browser: true,
      node: true,
      es2021: true,
    },
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  plugins: {
    '@typescript-eslint': eslintPluginTypescript,
    prettier: eslintPluginPrettier,
    'simple-import-sort': eslintPluginSimpleImportSort,
  },
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-console': 'warn',
    'no-debugger': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
  },
  ignores: ['node_modules/**', 'dist/**', 'build/**'],
};
