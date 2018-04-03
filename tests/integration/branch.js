const { assert } = require('chai');
const { host, port } = require('../../app/config');
const common = require('./common');

const branchName = 'master';

/* eslint-disable no-undef, func-names */
describe('Страница ветки:', () => {
  it('страница существует', function () {
    return this.browser
      .url(`/${branchName}`)
      .status()
      .then((status) => {
        assert.ok(status);
      });
  });

  common.header();
  common.urlRepo();

  describe('Ссылки:', () => {
    it('отображается ссылка на дерево файлов', function () {
      return this.browser
        .url(`/${branchName}`)
        .$('.branches__name--tree a')
        .then((treeLink) => {
          assert.ok(treeLink);
        });
    });
    it('ссылка на дерево файлов работает правильно', function () {
      return this.browser
        .url(`/${branchName}`)
        .$('.branches__name--tree a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}/tree`);
        });
    });
    it('отображается ссылка на список коммитов', function () {
      return this.browser
        .url(`/${branchName}`)
        .$('.branches__name--commits a')
        .then((commitsLink) => {
          assert.ok(commitsLink);
        });
    });
    it('ссылка на список коммитов работает правильно', function () {
      return this.browser
        .url(`/${branchName}`)
        .$('.branches__name--commits a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}/commits`);
        });
    });
  });
});
