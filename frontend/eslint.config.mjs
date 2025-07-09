// eslint.config.mjs
import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"] 
  },
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node
      }
    } 
  },
], {
  ignores: [
    "node_modules/**",
    "dist/**",
    "build/**",
    "public/**",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "vite.config.js",
    "eslint.config.mjs"
  ]
})