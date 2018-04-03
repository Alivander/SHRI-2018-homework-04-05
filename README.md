# SHRI-2018-homework-04-05

Домашнее работа по темам: 
* "Node.js",
* "Инфраструктура",
* "Тесты. Модульное тестирование. Интеграционное тестирование интерфейсов".

### По заданию: "Node.js"

```
npm i
npm start  // development-сборка (без оптимизации) и запуск сервера

npm run dev  // development-сборка (без оптимизации)
npm run build  // production-сборка (с оптимизацией)
npm run lint  // запуск линтеров для проверки кода
```
Приложение работает с url репозиторием, прописанным в app/config.js.

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
* Не удается загрузить большие файлы.

Так как я не смогла создать docker-контенер, я не могу инкапсулировать файлы в репозитории отноительно папки .git, а стало быть, не могу добавить внутрь еще один репозиторий, чтобы сделать возможным предпросмотр приложения с помощью GitHub Pages.

### По заданию по теме "Инфраструктура": 
* Я работаю в ОС Windows 10.
* Я реализовала проверку кода, сборку проекта и оптимизацию кода.
* Мне удалось установить travis, heroku и получить ключ для api Heroku, добавить репозиторий в Heroku. 
* Но мне не удалось ни создать новый Docker-образ, ни использовать существующие. Технические условия даже не позволили скачать готовый контейнер, так как скорость интернета в хостеле была около 30Кбт:
![скриншот](https://yandex.ru/internet/informer/white/ru/30504.837983352634-184017.33990147783.png).
При переключении в Docker на Windows контейнеры, мне всегда выдает ошибку "no matching manifest for windows/amd64 in the manifest list entries", вне зависимости от параметра, заданного в FROM. Только столкнувшись с Гермионой я теперь кажется понимаю что речь идет о amd64 Visual C++, инсталлятор которого весит что-то около 2Гб (так как разворачивается в 4Гб на диске). При переключении на Linux-контейнеры; "not find a binding for your current environment: Linux 64-bit with Node.js 9.x. Found bindings for the following environments: - Windows 64-bit with Node.js 8.x". У меня получилось создать некий контейнер, удалив на время его формирования папку node_modules из проекта. ОН запустился, сделал сборку, но при попытке открыть его на localhost, выдал ошибку "err: Error: spawn /bin/sh ENOENT". Исправить и доделать задание уже просто не успеваю.

### По заданию по теме "Тесты":

```
npm i
npm start  // development-сборка (без оптимизации) и запуск сервера
selenium-standalone start  // запуск Selenium
npm run test // запуск интеграционных и unit-тестов
```

Реализованы модульные тесты для утилиты parser, которая получает на вход строку-ответ из консоли, обрабатывает ее и возвращает в виде объектов:
* массива с именами веток;
* массива с объектами-коммитами, содержащими хеш, дату, сообщение и имя автора коммита;
* массива с объектами-элементами файловой системы.

Реализованы интеграционные тесты для всех возможных страниц приложения:
* для главной страницы (здесь ветка еще не выбрана);
* страницы ветки;
* страницы с деревом файлов для ветки;
* страницы с отображением содержимого файлов для ветки;
* страницы со списком коммитов для ветки;
* страницы с деревом файлов для коммита.  
Последовательность и отдельные пункты отличаются от указанных в ТЗ, но сохраняют общую логику. На лекции упоминали, что если описанные в ДЗ тесты не подходят под наш вариант приложения, то можно их изменить, сохранив основную идею.

Репозиторий-болванка для тестов содержится в repo-for-test.zip.

Использованы:
* Selenium,
* Hermione,
* Mocha,
* Chai.

При написании тестов столкнулась с проблемой - я разделила тесты на отдельные файлы, при этом в каждом файле переход на нужную страницу осуществлялся один раз в начале, и если запускать их по отдельности, то они работают правильно. Но если запускать их вместе, то они выполняются вперемешку и валятся. То есть выполняется it('message', test) то из одного файла, то из другого в одной вкладке. Пробовала запускать в разных окнах с помошью .newWindow, но тогда валятся все тесты в Firefox. В итоге мне пришлось добавить в каждый it переход на страницу по .url - тесты теперь работают, но мне очень не нравится это решение - долго и дорого.
