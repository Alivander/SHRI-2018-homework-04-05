const assert = require('assert');

/* eslint-disable no-undef */

// module.exports = (hermione, opts) => {
//   hermione.on(hermione.events.NEW_BROWSER, (browser) => {
//     browser.addCommand('assertExists', (selector,msg) => {
//       return browser
//         .isExisting(selector)
//         .then((exists) => assert.ok(exsists, msg));
//     });
//   });
// });
describe('Главная страница', () => {
  describe('Название приложения', () => {
    it('Страница содержит корректный title', () => {
      return this.browser
        .url('/')
        .getTitle()
        .then((title) => {
          assert.aqual(title, 'GIT-LOC', 'некорректный title');
        });
    });
    it('Страница содержит корректный заголовок h1', () => {
      return this.browser
        .url('/')
        .getText('header h1 a')
        .then((title) => {
          assert.aqual(title, 'GIT-LOC', 'некоректный заголовок страницы');
        });
    });
  });
  describe('url текущего репозитория', () => {
    it('Должен появиться url репозитория из config.js', () => {
      return this.browser
        .url('/')
        .isExisting('.content__name-repo')
        .then((exists) => {
          assert.ok(exists, 'url текущего репозитория отсутствует');
        });
    });
    it('url, отображаемый на странице, соответсвует url в config.js', () => {
      return this.browser
        .url('/')
        .getText('.content__name-repo')
        .then((url) => {
          assert.aqual(url, config.url, 'некорректный url текущего репозитория');
        });
    });
  });
});
