# EventPass Frontend

Frontend-приложение для платформы EventPass.

Стек:

- React
- TypeScript
- Vite
- Material UI (MUI)
- Redux Toolkit + RTK Query
- React Hook Form
- ESLint (flat config)
- Prettier

---

## 📦 Установка

```bash
npm install
```

---

## 🚀 Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу:

```
http://localhost:3000
```

---

## 🏗 Сборка production-версии

```bash
npm run build
```

Сборка появится в папке:

```
build/
```

---

## 🔍 Предпросмотр production-сборки

```bash
npm run preview
```

---

## 🧹 Линтинг

Проверка:

```bash
npm run lint
```

Авто-исправление:

```bash
npm run lint:fix
```

---

## 🎨 Форматирование кода

Форматировать весь проект:

```bash
npm run format
```

Проверить форматирование:

```bash
npm run format:check
```

---

## ⚙️ Переменные окружения

Создай файл `.env` в корне проекта:

```env
VITE_API_URL=http://localhost:3000
```

Все переменные должны начинаться с префикса `VITE_`.

---

## 📁 Структура проекта

```
src/
 ├── app/        # store, providers
 ├── shared/     # общие утилиты, api, ui
 ├── features/   # бизнес-фичи
 ├── entities/   # сущности домена
 ├── widgets/    # составные блоки
 └── main.tsx
```

---

## 🔗 Алиасы импортов

Поддерживаются абсолютные пути:

```ts
import { api } from '@shared/api';
import { store } from '@app/store';
```

Алиасы настраиваются через `tsconfig.json` и `vite-tsconfig-paths`.

---

## 🧠 State Management

Используется Redux Toolkit.

RTK Query применяется для работы с API.

---

## 📌 Требования

- Node.js >= 18
- npm >= 9

---

## 📄 Лицензия

MIT
