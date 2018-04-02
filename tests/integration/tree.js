const { assert } = require('chai');
const { url, host, port } = require('../../app/config');
const util = require('./util');

/* eslint-disable no-undef, func-names */
describe('Страница дерева файлов:', () => {
  describe('Название сайта:', () => {
    it('у вкладки есть title', function () {
      return this.browser
        .url('/master/tree')
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

  describe('breadcrumbs', () => {
    it('отображается список breadcrumbs', function () {
      return this.browser
        .$('.breadcrumbs')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('содержимое breadcrumbs соответствует ожидаемому', function () {
      return this.browser
        .getText('.breadcrumbs a')
        .then((branch) => {
          assert.equal(branch, 'master');
        });
    });
    it('ссылка в breadcrumbs работает правильно', function () {
      return this.browser
        .$('.breadcrumbs a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/master`);
          return true;
        })
        .back();
    });
  });

  describe('Дерево файлов:', () => {
    it('отображается дерево файлов', function () {
      return this.browser
        .$('.tree')
        .then((tree) => {
          assert.ok(tree);
        });
    });
    it('отображается правильное дерево файлов', function () {
      const treeOriginal = '<li class="tree__item tree__item--folder"><a href="/master/tree/css">css</a></li><li class="tree__item tree__item--folder"><a href="/master/tree/img">img</a></li><li class="tree__item tree__item--folder"><a href="/master/tree/js">js</a></li><li class="tree__item"><a href="/master/tree/README.md">README.md</a></li><li class="tree__item"><a href="/master/tree/index.html">index.html</a></li><li class="tree__item"><a href="/master/tree/inner.html">inner.html</a></li>';

      return this.browser
        .getHTML('.tree', false)
        .then((treeHTML) => {
          assert.equal(treeHTML, treeOriginal);
        });
    });
    it('ссылки в дереве файлов работают правильно', function () {
      let link;
      let linkName;

      return this.browser
        .$$('.tree__item a')
        .then((links) => {
          link = links[util.randomIndex(0, links.length - 1)];
          return link;
        })
        .getText(link)
        .then((name) => {
          linkName = name;
          return link;
        })
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/master/tree/${linkName}`);
        });
    });
  });
});
