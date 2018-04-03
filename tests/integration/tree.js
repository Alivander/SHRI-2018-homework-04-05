const { assert } = require('chai');
const { url, host, port } = require('../../app/config');
const util = require('./util');
const common = require('./common');

/* eslint-disable no-undef, func-names */
describe('Страница дерева файлов:', () => {
  it('страница существует', function () {
    return this.browser
      .url('/master/tree')
      .status()
      .then((status) => {
        assert.ok(status);
      });
  });

  common.header();
  common.urlRepo();

  describe('breadcrumbs', () => {
    it('отображается список breadcrumbs', function () {
      return this.browser
        .url('/master/tree')
        .$('.breadcrumbs')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('содержимое breadcrumbs соответствует ожидаемому', function () {
      return this.browser
        .url('/master/tree')
        .getText('.breadcrumbs a')
        .then((branch) => {
          assert.equal(branch, 'master');
        });
    });
    it('ссылка в breadcrumbs работает правильно', function () {
      return this.browser
        .url('/master/tree')
        .$('.breadcrumbs a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/master`);
        });
    });
  });

  describe('Дерево файлов:', () => {
    it('отображается дерево файлов', function () {
      return this.browser
        .url('/master/tree')
        .$('.tree')
        .then((tree) => {
          assert.ok(tree);
        });
    });
    it('отображается правильное дерево файлов', function () {
      const treeOriginal = '<li class="tree__item tree__item--folder"><a href="/master/tree/css">css</a></li><li class="tree__item tree__item--folder"><a href="/master/tree/img">img</a></li><li class="tree__item tree__item--folder"><a href="/master/tree/js">js</a></li><li class="tree__item"><a href="/master/tree/README.md">README.md</a></li><li class="tree__item"><a href="/master/tree/index.html">index.html</a></li><li class="tree__item"><a href="/master/tree/inner.html">inner.html</a></li>';

      return this.browser
        .url('/master/tree')
        .getHTML('.tree', false)
        .then((treeHTML) => {
          assert.equal(treeHTML, treeOriginal);
        });
    });
    it('ссылки в дереве файлов работают правильно', function () {
      let link;
      let linkName;

      return this.browser
        .url('/master/tree')
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
