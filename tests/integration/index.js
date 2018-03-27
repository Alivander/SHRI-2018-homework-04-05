const { assert } = require('chai');
const { url, host, port } = require('../../app/config');

function randomIndex(min, max) {
  /* eslint-disable no-mixed-operators */
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  /* eslint-anable no-mixed-operators */
}

/* eslint-disable no-undef, func-names */
describe('Главная страница:', () => {
  describe('Название:', () => {
    it('проверка наличия title', function () {
      return this.browser
        .url('/')
        .getTitle()
        .then((title) => {
          assert.ok(title, 'title отсутствует');
        });
    });
    it('title соответствует ожидаемому', function () {
      return this.browser
        .getTitle()
        .then((title) => {
          assert.equal(title, 'GIT-LOC', 'некорректный title');
        });
    });
    it('проверка наличия h1', function () {
      return this.browser
        .getText('header h1 a')
        .then((heading) => {
          assert.ok(heading, 'заголовок h1 отсутствует');
        });
    });
    it('заголовок h1 соответствует ожидаемому', function () {
      return this.browser
        .getText('header h1 a')
        .then((heading) => {
          assert.equal(heading, 'GIT-LOC', 'некоректный заголовок h1');
        });
    });
  });

  describe('url текущего репозитория', () => {
    it('отображается url текущего репозитория', function () {
      return this.browser
        .$('.content__name-repo')
        .then((path) => {
          assert.ok(path, 'не отображается url текущего репозитория');
        });
    });
    it('url текущего репозитория соответствует ожидаемому', function () {
      return this.browser
        .getText('.content__name-repo')
        .then((path) => {
          assert.equal(path, url, 'некорректный url текущего репозитория');
        });
    });
  });

  describe('Ветки:', () => {
    it('отображается список веток', function () {
      return this.browser
        .$('.branches__list')
        .then((branchList) => {
          assert.ok(branchList, 'не отображается список веток');
        });
    });
    it('первой в списке идет ветка master', function () {
      return this.browser
        .getText('.branches__name:first-child a')
        .then((name) => {
          assert.equal(name, 'master', 'первая ветка в списке отлична от master');
        });
    });
    it('при переходе по случайной ветке отображается страница этой ветки', function () {
      let branch;
      let branchName;

      return this.browser
        .$$('.branches__name a')
        .then((branches) => {
          branch = branches[randomIndex(0, branches.length - 1)];
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
          assert.equal(path, `http://${host}:${port}/${branchName}`, 'неправильная ссылка у ветки');
        });
    });
  });
});
