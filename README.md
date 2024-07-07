## Установка зависимостей
npm install


## Конфигурация переменных окружения
Создайте файл .env в корне проекта и добавьте в него следующие строки:
YOUR_USERNAME=<ваш-логин>
YOUR_PASSWORD=<ваш-пароль>
YOUR_REPO=<ваш-репозиторий>
ISSUE_NUMBER=<номер-issue>

Номер issue используется для того, чтобы понять, с каким issue взаимодействовать. То есть, чтобы понять, какой изменить, какой проверить на существование, а какой удалить.


## Запуск тестов
В package.json добавлены следующие скрипты для запуска тестов:

- npm run test:create: запуск тестов создания issue (createIssue.test.ts).
- npm run test:check: запуск тестов проверки issue (checkIssue.test.ts).
- npm run test:update: запуск тестов обновления issue (updateIssue.test.ts).
- npm run test:delete: запуск тестов удаления issue (deleteIssue.test.ts).
- npm run test:sequential: последовательный запуск всех вышеуказанных тестов.


## Генерация Allure отчетов
Для генерации отчетов Allure выполните следующее:

1. Запустите тесты (например, последовательно):
 npm run test:sequential

2. Сгенерируйте отчет Allure:
 npm run generate:allure-report

3. Откройте отчет в браузере:
  npm run open:allure-report


## Расшифровка срикптов

- "test:create": "npx playwright test tests/testCases/createIssue.test.ts",
- "test:check": "npx playwright test tests/testCases/checkIssue.test.ts",
- "test:update": "npx playwright test tests/testCases/updateIssue.test.ts",
- "test:delete": "npx playwright test tests/testCases/deleteIssue.test.ts",
- "test:sequential": "npm run test:create && npm run test:check && npm run test:update && npm run test:delete",
- "generate:allure-report": "allure generate allure-results --clean -o allure-report",
- "open:allure-report": "allure open allure-report"