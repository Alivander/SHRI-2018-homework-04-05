/* eslint-disable no-unused-vars */
const { assert } = require('chai');
const { url, host, port } = require('../../../app/config');
/* eslint-anable no-unused-vars */

/* eslint-disable no-undef, func-names */
function headerTest() {
  describe('Название сайта:', () => {
    it('у вкладки есть title', function () {
      return this.browser
        .getTitle()
        .then((title) => {
          assert.ok(title);
        });
    });
    it('title соответствует ожидаемому', function () {
      return this.browser
        .getTitle()
        .then((title) => {
          assert.equal(title, 'GIT-LOC');
        });
    });
    it('на странице есть заголовок h1', function () {
      return this.browser
        .getText('header h1 a')
        .then((heading) => {
          assert.ok(heading);
        });
    });
    it('заголовок h1 соответствует ожидаемому', function () {
      return this.browser
        .getText('header h1 a')
        .then((heading) => {
          assert.equal(heading, 'GIT-LOC');
        });
    });
  });
}

module.exports = headerTest;
