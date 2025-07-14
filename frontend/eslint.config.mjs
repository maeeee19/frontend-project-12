// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { 
      js,
      '@stylistic': stylistic,
    },
    extends: ['js/recommended'],
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/eol-last': ['error', 'always'],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
], {
  ignores: [
    'node_modules/**',
    'dist/**',
    'build/**',
    'public/**',
    '**/*.jsx',
    '**/*.ts',
    '**/*.tsx',
    'vite.config.js',
    'eslint.config.mjs',
  ],
})