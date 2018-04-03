const { assert } = require('chai');
const { url, host, port } = require('../../app/config');
const util = require('./util');
const common = require('./common');

/* eslint-disable no-undef, func-names */
describe('Главная страница:', () => {
  it('страница существует', function () {
    return this.browser
      .url('/')
      .status()
      .then((status) => {
        assert.ok(status);
      });
  });

  common.header();
  common.urlRepo();

  describe('Ветки:', () => {
    it('отображается список веток', function () {
      return this.browser
        .url('/')
        .$('.branches__list')
        .then((branchList) => {
          assert.ok(branchList);
        });
    });
    it('первой в списке идет ветка master', function () {
      console.log('THIS BROWSER URL', this.browser.getUrl());
      return this.browser
        .url('/')
        .getText('.branches__name:first-child a')
        .then((name) => {
          assert.equal(name, 'master');
        });
    });
    it('при переходе по случайной ветке отображается страница этой ветки', function () {
      let branch;
      let branchName;

      return this.browser
        .url('/')
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
