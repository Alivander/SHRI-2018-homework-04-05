const { assert } = require('chai');
const { url, host, port } = require('../../app/config');
const util = require('./util');

/* eslint-disable no-undef, func-names */
describe('Страница ветки:', () => {
  describe('Название сайта:', () => {
    it('у вкладки есть title', function () {
      let branch;

      return this.browser
        .url('/')
        .$$('.branches__name a')
        .then((branches) => {
          branch = branches[util.randomIndex(0, branches.length - 1)];
          return branch;
        })
        .click()
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

  describe('Ссылки:', () => {
    it('отображается ссылка на дерево файлов', function () {
      return this.browser
        .$('.branches__name--tree a')
        .then((treeLink) => {
          assert.ok(treeLink);
        });
    });
    it('ссылка на дерево файлов работает правильно', function () {
      let branchName;
      const bsr = this.browser;

      return this.browser
        .getUrl()
        .then((path) => {
          branchName = path.slice(path.lastIndexOf('/') + 1, path.length);
          return bsr;
        })
        .$('.branches__name--tree')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}/tree`);
          return true;
        })
        .back();
    });
    it('отображается ссылка на список коммитов', function () {
      return this.browser
        .$('.branches__name--commits a')
        .then((commitsLink) => {
          assert.ok(commitsLink);
        });
    });
    it('ссылка на список коммитов работает правильно', function () {
      let branchName;
      const bsr = this.browser;

      return this.browser
        .getUrl()
        .then((path) => {
          branchName = path.slice(path.lastIndexOf('/') + 1, path.length);
          return bsr;
        })
        .$('.branches__name--commits')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}/commits`);
          return true;
        })
        .back();
    });
  });
});
