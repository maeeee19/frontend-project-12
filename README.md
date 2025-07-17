### Hexlet tests and linter status:
[![Actions Status](https://github.com/maeeee19/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/maeeee19/frontend-project-12/actions)

# Ссылка на Render
https://frontend-project-12-3adz.onrender.com/

# React + Vite

Этот проект — фронтенд-приложение на React с использованием Vite.

## Как запустить проект (разработка)

1. Установите зависимости:
   ```bash
   npm ci
   ```
2. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```
   Приложение будет доступно по адресу: http://localhost:5002

## Как собрать проект (production)

1. Соберите проект:
   ```bash
   npm run build
   ```
   После сборки папка `dist` будет содержать готовые файлы.

2. Для локального просмотра production-сборки используйте:
   ```bash
   npm run serve
   ```
   По умолчанию приложение будет доступно по адресу: http://localhost:4173

## Как запустить production-сборку на сервере

1. Скопируйте содержимое папки `dist` на сервер.
2. Используйте любой статический сервер, например [serve](https://www.npmjs.com/package/serve):
   ```bash
   npx serve -s dist
   ```

## Проверка кода

- Запуск линтера:
  ```bash
  npm run lint
  ```
- Автоматическое исправление ошибок:
  ```bash
  npm run lint:fix
  ```

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
