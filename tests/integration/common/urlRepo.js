const { assert } = require('chai');
const { url } = require('../../../app/config');

/* eslint-disable no-undef, func-names */
function urlRepoTest() {
  describe('url текущего репозитория', () => {
    it('отображается url текущего репозитория', function () {
      return this.browser
        .$('.content__name-repo')
        .then((path) => {
          assert.ok(path);
        });
    });
    it('url текущего репозитория соответствует ожидаемому', function () {
      return this.browser
        .getText('.content__name-repo')
        .then((path) => {
          assert.equal(path, url);
        });
    });
  });
}

module.exports = urlRepoTest;
