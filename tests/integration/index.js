const { assert } = require('chai');
const config = require('../../app/config');
// const webdriverio = require('webdriverio');

/* eslint-disable no-undef, func-names */
describe('Главная страница:', () => {
  describe('Название:', () => {
    it('присутствует title', function () {
      return this.browser
        .url('/')
        .getTitle()
        .then((title) => {
          assert.ok(title, 'title отсутствует');
        });
    });
    it('title содержит название приложения', function () {
      return this.browser
        .url('/')
        .getTitle()
        .then((title) => {
          assert.equal(title, 'GIT-LOC', 'некорректный title');
        });
    });
    it('корректный заголовок h1', function () {
      return this.browser
        .url('/')
        .getText('header h1 a')
        .then((title) => {
          assert.equal(title, 'GIT-LOC', 'некоректный заголовок h1');
        });
    });
  });
  describe('url текущего репозитория', () => {
    it('Должен появиться url репозитория из config.js', function () {
      return this.browser
        .url('/')
        .isExisting('.content__name-repo')
        .then((exists) => {
          assert.ok(exists, 'url текущего репозитория отсутствует');
        });
    });
    it('url, отображаемый на странице, соответсвует url в config.js', function () {
      return this.browser
        .url('/')
        .getText('.content__name-repo')
        .then((url) => {
          assert.equal(url, config.url, 'некорректный url текущего репозитория');
        });
    });
  });
});
