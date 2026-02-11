import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      'src/generated/**',
      '**/*.d.ts',
      'src/types/**',
      '**/*.config.js',
    ],
  },
  js.configs.recommended,
  configPrettier,
  {
    files: ['**/*.ts'],
    ignores: ['**/*.config.ts'],
    languageOptions: {
      parser: tsParser,
      globals: {
        process: 'readonly',
        console: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        jest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        Express: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier: prettierPlugin,
      jest: jestPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      'jest/no-disabled-tests': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'error',
      eqeqeq: ['error', 'always'],
      'prettier/prettier': 'none',
    },
  },
];
