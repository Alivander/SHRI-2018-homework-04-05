const { assert } = require('chai');
const { host, port } = require('../../app/config');
const util = require('./util');
const common = require('./common');

const hashCommit = '2bc76219d1e35e03882d95e724776c6d2e091a09';

/* eslint-disable no-undef, func-names */
describe('Страница дерева файлов:', () => {
  it('страница существует', function () {
    return this.browser
      .url(`/branch-test-1/commits/${hashCommit}`)
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
        .url(`/branch-test-1/commits/${hashCommit}`)
        .$('.breadcrumbs')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('содержимое breadcrumbs соответствует ожидаемому', function () {
      return this.browser
        .url(`/branch-test-1/commits/${hashCommit}`)
        .getText('.breadcrumbs a')
        .then((branch) => {
          assert.equal(branch, 'branch-test-1');
        });
    });
    it('ссылка в breadcrumbs работает правильно', function () {
      return this.browser
        .url(`/branch-test-1/commits/${hashCommit}`)
        .$('.breadcrumbs a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/branch-test-1`);
        });
    });
    it('последний пункт в breadcrumbs содержит хеш коммита', function () {
      return this.browser
        .url(`/branch-test-1/commits/${hashCommit}`)
        .$('.breadcrumbs__item:last-child')
        .getText()
        .then((hash) => {
          assert.equal(hash, hashCommit);
        });
    });
  });

  describe('Дерево файлов:', () => {
    it('отображается дерево файлов', function () {
      return this.browser
        .url(`/branch-test-1/commits/${hashCommit}`)
        .$('.tree')
        .then((tree) => {
          assert.ok(tree);
        });
    });
    it('отображается правильное дерево файлов', function () {
      const treeOriginal = '<li class="tree__item tree__item--folder"><a href="/branch-test-1/commits/2bc76219d1e35e03882d95e724776c6d2e091a09/css">css</a></li><li class="tree__item tree__item--folder"><a href="/branch-test-1/commits/2bc76219d1e35e03882d95e724776c6d2e091a09/img">img</a></li><li class="tree__item tree__item--folder"><a href="/branch-test-1/commits/2bc76219d1e35e03882d95e724776c6d2e091a09/js">js</a></li><li class="tree__item"><a href="/branch-test-1/commits/2bc76219d1e35e03882d95e724776c6d2e091a09/README.md">README.md</a></li><li class="tree__item"><a href="/branch-test-1/commits/2bc76219d1e35e03882d95e724776c6d2e091a09/index.html">index.html</a></li>';

      return this.browser
        .url(`/branch-test-1/commits/${hashCommit}`)
        .getHTML('.tree', false)
        .then((treeHTML) => {
          assert.equal(treeHTML, treeOriginal);
        });
    });
    it('ссылки в дереве файлов работают правильно', function () {
      let link;
      let linkName;

      return this.browser
        .url(`/branch-test-1/commits/${hashCommit}`)
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
          assert.equal(path, `http://${host}:${port}/branch-test-1/commits/${hashCommit}/${linkName}`);
        });
    });
  });
});
