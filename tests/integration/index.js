const { assert } = require('chai');
const { url, host, port } = require('../../app/config');
const util = require('./util');

/* eslint-disable no-undef, func-names */
describe('Главная страница:', () => {
  describe('Название сайта:', () => {
    it('у вкладки есть title', function () {
      return this.browser
        .url('/')
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

  describe('Ветки:', () => {
    it('отображается список веток', function () {
      return this.browser
        .$('.branches__list')
        .then((branchList) => {
          assert.ok(branchList);
        });
    });
    it('первой в списке идет ветка master', function () {
      return this.browser
        .getText('.branches__name:first-child a')
        .then((name) => {
          assert.equal(name, 'master');
        });
    });
    it('при переходе по случайной ветке отображается страница этой ветки', function () {
      let branch;
      let branchName;

      return this.browser
        .$$('.branches__name a')
        .then((branches) => {
          branch = branches[util.randomIndex(0, branches.length - 1)];
          return branch;
        })
        .getText(branch)
        .then((name) => {
          branchName = name;
          return branch;
        })
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}`);
        });
    });
  });
});
