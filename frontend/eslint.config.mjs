// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    plugins: { 
      js,
      '@stylistic': stylistic,
    },
    extends: ['js/recommended'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/semi': ['error', 'never'],
    },
  },
], {
  ignores: [
    'node_modules/**',
    'dist/**',
    'build/**',
    'public/**',
    '**/*.ts',
    '**/*.tsx',
    'vite.config.js',
    'eslint.config.mjs',
  ],
})