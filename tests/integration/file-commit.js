const { assert } = require('chai');
const { host, port } = require('../../app/config');
const common = require('./common');

const branchName = 'branch-test-1';
const hashCommit = '2bc76219d1e35e03882d95e724776c6d2e091a09';

/* eslint-disable no-undef, func-names */
describe('Страница файла из коммита:', () => {
  it('страница существует', function () {
    return this.browser
      .url(`/${branchName}/commits/${hashCommit}/README.md`)
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
        .url(`/${branchName}/commits/${hashCommit}/README.md`)
        .$('.breadcrumbs')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('содержимое breadcrumbs соответствует ожидаемому', function () {
      const breadcrumbsContent = '<li class="breadcrumbs__item"><a href="/branch-test-1">branch-test-1</a></li><li class="breadcrumbs__item"><a href="/branch-test-1/commits/2bc76219d1e35e03882d95e724776c6d2e091a09">2bc76219d1e35e03882d95e724776c6d2e091a09</a></li><li class="breadcrumbs__item">README.md</li>';

      return this.browser
        .url(`/${branchName}/commits/${hashCommit}/README.md`)
        .getHTML('.breadcrumbs', false)
        .then((html) => {
          assert.equal(html, breadcrumbsContent);
        });
    });
    it('ссылка на ветку работает правильно', function () {
      return this.browser
        .url(`/${branchName}/commits/${hashCommit}/README.md`)
        .$('.breadcrumbs__item:first-child a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}`);
        });
    });
    it('ссылка на коммит работает правильно', function () {
      return this.browser
        .url(`/${branchName}/commits/${hashCommit}/README.md`)
        .$('.breadcrumbs__item:nth-child(2) a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/${branchName}/commits/${hashCommit}`);
        });
    });
  });

  describe('Файл:', () => {
    it('отображается содержимое файла', function () {
      return this.browser
        .url(`/${branchName}/commits/${hashCommit}/README.md`)
        .$('.previews__file')
        .then((preview) => {
          assert.ok(preview);
        });
    });
    it('отображается правильное дерево файлов', function () {
      const fileOriginal = '# test\ntest\n';

      return this.browser
        .url(`/${branchName}/commits/${hashCommit}/README.md`)
        .getHTML('.previews__file', false)
        .then((fileHTML) => {
          assert.equal(fileHTML, fileOriginal);
        });
    });
  });
});
