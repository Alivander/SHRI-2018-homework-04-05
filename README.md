# SHRI-2018-homework-04-05

Домашнее работа по темам: 
* "Node.js",
* "Инфраструктура",
* "Тесты. Модульное тестирование. Интеграционное тестирование интерфейсов".

```
npm i
npm start  // development-сборка (без оптимизации) и запуск сервера

npm run dev  // development-сборка (без оптимизации)
npm run build  // production-сборка (с оптимизацией)
npm run lint  // запуск линтеров для проверки кода
npm run deploy // создание ветки и публикация ее на GitHub Pages
```
Приложение работает с url репозитория, прописанным в app/config.js.

Для текущего элемента каталога отображается путь в виде хлебных крошек и содержимое в виде списка.
Все кликабельно, можно переходить по ссылкам.

Хотела реализовать возможность указания пути к репозиторию из веб-интерфейса, но не успела.

Используется:
* Sass (scss)
* Pug
* Gulp
* Postcss (autoprefixer)
* CssO, UgliFly, ImageMin (minification)
* sourcemap
* editorconfig, stylelint и eslint
* Express
* Node.js
* Travis CI
* Heroku

Настроена сборка без минификации файлов для разработки, и сборка с минификацией для продакшена.

В приложении не используются изображения (кроме favicon) и скрипты на клиенте, но для них оставлены примеры для демонстрации сборки и минификации.

Баги, которые не успеваю пофиксить:
* После фикса файлов с помошью eslint на некоторых страницах перестал отображаться в шапке путь к репозиторию;
* Не удается загрузить большие файлы.
