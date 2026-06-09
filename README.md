# London Route Transfers

Транспортная компания в Лондоне — лендинг с формой бронирования и панелью менеджера.

## Технологии

- **Next.js 15** (App Router)
- **React 19** + TypeScript
- **Tailwind CSS v4**
- **next-intl** (мультиязычность EN/RU)
- **react-hook-form** + **zod** (валидация формы)
- **framer-motion** (анимации)

## Функциональность

- 🌍 Локализация: английский / русский
- 📱 Адаптивный дизайн
- 📝 Форма бронирования с валидацией (react-hook-form + zod)
- 📋 Панель менеджера с mock-данными (фильтр, поиск)
- ⚡ Плавный скролл и анимации
- 📄 Юридические страницы (Privacy, Cookies, Terms)

## Установка и запуск

```bash
# Клонирование репозитория
git clone <repository-url>
cd london_project

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

Откройте http://localhost:3000


Структура
src/
├── app/[locale]/     # Страницы
├── components/       # Компоненты
├── i18n/            # Локализация
├── lib/             # Схема zod и mock-данные
└── messages/        # Переводы en/ru