const { assert } = require('chai');
const { host, port } = require('../../app/config');
const common = require('./common');

/* eslint-disable no-undef, func-names */
describe('Страница файла:', () => {
  it('страница существует', function () {
    return this.browser
      .url('/master/tree/inner.min.html')
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
        .url('/master/tree/inner.min.html')
        .$('.breadcrumbs')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('содержимое breadcrumbs соответствует ожидаемому', function () {
      return this.browser
        .url('/master/tree/inner.min.html')
        .getText('.breadcrumbs a')
        .then((branch) => {
          assert.equal(branch, 'master');
        });
    });
    it('ссылка на ветку работает правильно', function () {
      return this.browser
        .url('/master/tree/inner.min.html')
        .$('.breadcrumbs a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/master`);
        });
    });
  });

  describe('Файл:', () => {
    it('отображается содержимое файла', function () {
      return this.browser
        .url('/master/tree/inner.min.html')
        .$('.previews__file')
        .then((preview) => {
          assert.ok(preview);
        });
    });
    it('отображается правильное дерево файлов', function () {
      const fileOriginal = '&lt;!DOCTYPE html&gt;&lt;html lang="en"&gt;&lt;head&gt;&lt;meta charset="UTF-8"&gt;&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;&lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;&lt;title&gt;Document&lt;/title&gt;&lt;/head&gt;&lt;body&gt;&lt;h1&gt;Inner page&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;';

      return this.browser
        .url('/master/tree/inner.min.html')
        .getHTML('.previews__file', false)
        .then((fileHTML) => {
          assert.equal(fileHTML, fileOriginal);
        });
    });
  });
});
