[![Tests 13 sprint](https://github.com/samura-io/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg)](https://github.com/samura-io/express-mesto-gha/actions/workflows/tests-13-sprint.yml) [![Tests 14 sprint](https://github.com/samura-io/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg)](https://github.com/samura-io/express-mesto-gha/actions/workflows/tests-14-sprint.yml)

# Mesto Backend
 
Этот проект представляет собой серверную часть приложения Mesto, которое позволяет 
пользователям делиться фотографиями мест, которые они посетили.

## Установка

1. Склонируйте репозиторий на вашем локальном компьютере:

`git clone https://github.com/samura-io/mesto-backend.git`

2. Перейдите в каталог проекта:

`cd mesto-backend`

3. Установите зависимости:

`npm install`

## API Роуты
* GET /users - возвращает всех пользователей
* GET /users/:userId - возвращает пользователя по идентификатору
* POST /users - создает нового пользователя
* PATCH /users/me - обновляет профиль текущего пользователя
* PATCH /users/me/avatar - обновляет аватар текущего пользователя
* GET /cards - возвращает все карточки
* POST /cards - создает новую карточку
* DELETE /cards/:cardId - удаляет карточку по идентификатору
* PUT /cards/:cardId/likes - добавляет лайк карточке
* DELETE /cards/:cardId/likes - удаляет лайк с карточки

## Технологии
* Node.js
* Express.js
* MongoDB

## Автор
Алексакнкин Никита
