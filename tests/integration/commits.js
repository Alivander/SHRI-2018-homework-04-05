const { assert } = require('chai');
const { host, port } = require('../../app/config');
const util = require('./util');
const common = require('./common');

/* eslint-disable no-undef, func-names */
describe('Страница со списком коммитов:', () => {
  it('страница существует', function () {
    return this.browser
      .url('/master/commits')
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
        .url('/master/commits')
        .$('.breadcrumbs')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('содержимое breadcrumbs соответствует ожидаемому', function () {
      return this.browser
        .url('/master/commits')
        .getText('.breadcrumbs a')
        .then((branch) => {
          assert.equal(branch, 'master');
        });
    });
    it('ссылка на ветку работает правильно', function () {
      return this.browser
        .url('/master/commits')
        .$('.breadcrumbs a')
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/master`);
        });
    });
  });

  describe('Список коммитов:', () => {
    it('отображается список коммитов', function () {
      return this.browser
        .url('/master/commits')
        .$('.commits__list')
        .then((list) => {
          assert.ok(list);
        });
    });
    it('отображается правильный список коммитов', function () {
      const listOriginal = '<li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/14d3c442763601d509ba1903c19e8272348368c6">14d3c442763601d509ba1903c19e8272348368c6</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-04-03</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>adds-minifed-html</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/3191b2a252e6ef1b504ef89977833ca2cb123520">3191b2a252e6ef1b504ef89977833ca2cb123520</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-23</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>adds-styles</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/9e25a51afb495a7c8cfd242b8f18b197aa921371">9e25a51afb495a7c8cfd242b8f18b197aa921371</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-22</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>adds-inner-page</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/2f6446b0ff39fc0ea0ceceaafd1c482dae908053">2f6446b0ff39fc0ea0ceceaafd1c482dae908053</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-22</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>corects-readme</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/1864be935108fbde258e9bd089cdb2a98448a731">1864be935108fbde258e9bd089cdb2a98448a731</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-22</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>update-readme</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/6dc8bc33b98e28a126b7adf38901537a3a8582ae">6dc8bc33b98e28a126b7adf38901537a3a8582ae</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-11</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>test</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/1a91a5b6fe5c5cc19656163929c717018c9f9e9a">1a91a5b6fe5c5cc19656163929c717018c9f9e9a</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-11</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>test</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/2bc76219d1e35e03882d95e724776c6d2e091a09">2bc76219d1e35e03882d95e724776c6d2e091a09</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-11</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>test</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/0004365fdc5f80ad975c012d7288d102274d256d">0004365fdc5f80ad975c012d7288d102274d256d</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-11</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>test</p></li><li class="commits__item"><p class="commits__hash"><b>Hash:&nbsp;</b><a href="commits/1294d9cf133729969039dcdb56aeaae0f158a4ef">1294d9cf133729969039dcdb56aeaae0f158a4ef</a></p><p class="commits__date"><b>Date:&nbsp;</b>2018-03-10</p><p class="commits__author"><b>Author:&nbsp;</b>Alina Vanieva</p><p class="commits__message"><b>Message:&nbsp;</b>test</p></li>';

      return this.browser
        .url('/master/commits')
        .getHTML('.commits__list', false)
        .then((listHTML) => {
          assert.equal(listHTML, listOriginal);
        });
    });
    it('ссылки в коммиты работают правильно', function () {
      let link;
      let hashCommit;

      return this.browser
        .url('/master/commits')
        .$$('.commits__item a')
        .then((links) => {
          link = links[util.randomIndex(0, links.length - 1)];
          return link;
        })
        .getText(link)
        .then((hash) => {
          hashCommit = hash;
          return link;
        })
        .click()
        .getUrl()
        .then((path) => {
          assert.equal(path, `http://${host}:${port}/master/commits/${hashCommit}`);
        });
    });
  });
});
