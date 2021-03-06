const { assert } = require('chai');
const { host, port } = require('../../app/config');
const util = require('./util');
const common = require('./common');

const branchName = 'master';

/* eslint-disable no-undef, func-names */
describe('Страница дерева файлов:', () => {
  it('страница существует', function () {
    return this.browser
      .url(`/${branchName}/tree`)
      .status()
      .then((status) => {
        assert.ok(status);
      });
  });

  common.header();
  common.urlRepo();

  describe('breadcrumbs', () => {
    it('отображаются breadcrumbs', function () {
      return this.browser
        .url(`/${branchName}/tree`)
        .$('.breadcrumbs')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('содержимое breadcrumbs соответствует ожидаемому', function () {
      return this.browser
        .url(`/${branchName}/tree`)
        .getText('.breadcrumbs a')
        .then((branch) => {
          assert.equal(branch, branchName);
        });
    });
    it('ссылка на ветку работает правильно', function () {
      return this.browser
        .url(`/${branchName}/tree`)
        .$('.breadcrumbs a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}`);
        });
    });
  });

  describe('Дерево файлов:', () => {
    it('отображается дерево файлов', function () {
      return this.browser
        .url(`/${branchName}/tree`)
        .$('.tree')
        .then((tree) => {
          assert.ok(tree);
        });
    });
    it('отображается правильное дерево файлов', function () {
      const treeOriginal = '<li class="tree__item tree__item--folder"><a href="/master/tree/css">css</a></li><li class="tree__item tree__item--folder"><a href="/master/tree/img">img</a></li><li class="tree__item tree__item--folder"><a href="/master/tree/js">js</a></li><li class="tree__item"><a href="/master/tree/README.md">README.md</a></li><li class="tree__item"><a href="/master/tree/index.html">index.html</a></li><li class="tree__item"><a href="/master/tree/inner.html">inner.html</a></li><li class="tree__item"><a href="/master/tree/inner.min.html">inner.min.html</a></li>';

      return this.browser
        .url(`/${branchName}/tree`)
        .getHTML('.tree', false)
        .then((treeHTML) => {
          assert.equal(treeHTML, treeOriginal);
        });
    });
    it('ссылки в дереве файлов работают правильно', function () {
      let link;
      let linkName;

      return this.browser
        .url(`/${branchName}/tree`)
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
          assert.equal(path, `http://${host}:${port}/${branchName}/tree/${linkName}`);
        });
    });
  });
});
