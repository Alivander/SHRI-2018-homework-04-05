const { assert } = require('chai');
const parser = require('../../app/util/parser');

function randomIndex(min, max) {
  /* eslint-disable no-mixed-operators */
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
  /* eslint-anable no-mixed-operators */
}

/* eslint-disable no-undef */

describe('parser.js', () => {
  describe('branchesList()', () => {
    it('преобразует строку в массив с названиями веток', () => {
      const fake = '  branch-1   branch-2   branch-3   branch-4 * master ';
      const result = ['master', 'branch-1', 'branch-2', 'branch-3', 'branch-4'];

      assert.sameOrderedMembers(parser.branchesList(fake), result);
    });
  });

  describe('commitsList()', () => {
    it('преобразует строку в массив объектов-коммитов', () => {
      const fake = '7c73cbf5ee537fb3942574a119592546eeb6bb272018-03-22Alina Vanieva----update-doorOther.js\n69b7973ee1906670c2cbdcaa7aeb155b29feaa472018-03-22Alina Vanieva----update-doorBase.js\nef53d4f2c2cef5be80714f823dfe65bbd9c50a032018-03-22Alina Vanieva----update-app.js\n';

      assert.isArray(parser.commitsList(fake));
      assert.isObject(parser.commitsList(fake)[randomIndex(0, 3)]);
    });
    it('объект-коммит содержит корректный хеш', () => {
      const fake = '154cf274568ee670a1a1ec9d27a6dfffbbecc7a72018-03-10Alina Vanieva----Initial-commit\n';
      const hash = '154cf274568ee670a1a1ec9d27a6dfffbbecc7a7';

      assert.propertyVal(parser.commitsList(fake)[0], 'hash', hash);
    });
    it('объект-коммит содержит корректную дату', () => {
      const fake = '154cf274568ee670a1a1ec9d27a6dfffbbecc7a72018-03-10Alina Vanieva----Initial-commit\n';
      const date = '2018-03-10';

      assert.propertyVal(parser.commitsList(fake)[0], 'date', date);
    });
    it('объект-коммит содержит корректное имя автора', () => {
      const fake = '154cf274568ee670a1a1ec9d27a6dfffbbecc7a72018-03-10Alina Vanieva----Initial-commit\n';
      const author = 'Alina Vanieva';

      assert.propertyVal(parser.commitsList(fake)[0], 'author', author);
    });
    it('объект-коммит содержит корректное название коммита', () => {
      const fake = '154cf274568ee670a1a1ec9d27a6dfffbbecc7a72018-03-10Alina Vanieva----Initial-commit\n';
      const message = 'Initial-commit';

      assert.propertyVal(parser.commitsList(fake)[0], 'message', message);
    });
  });
  describe('treeList()', () => {
    it('преобразует строку в массив объектов файловой системы', () => {
      const fake = '100644 blob 9ae1e079d86c1132f4ff8b51606a840c56d0746f\tREADME.md\n040000 tree 71689a634f855ee7bdb1ea66050216318a6c7dfd\tcss\n040000 tree 258cee0af59520f83a2d2cd6969f0a1a0be87634\timg\n100644 blob 29f3466c27d2b4890ac38621248b19c275a6048b\tindex.htmlж\n040000 tree 7cb3e902d70c5d69a079cabbc58fe967a5835e1b\tjs\n';

      assert.isArray(parser.treeList(fake));
      assert.isObject(parser.treeList(fake)[randomIndex(0, 5)]);
    });
    it('объект содержит корректный хеш', () => {
      const fake = '100644 blob 9ae1e079d86c1132f4ff8b51606a840c56d0746f\tREADME.md\n';
      const hash = '9ae1e079d86c1132f4ff8b51606a840c56d0746f';

      assert.propertyVal(parser.treeList(fake)[0], 'hash', hash);
    });
    it('объект-коммит содержит корректный тип элемента', () => {
      const fake = '100644 blob 9ae1e079d86c1132f4ff8b51606a840c56d0746f\tREADME.md\n';
      const type = 'blob';

      assert.propertyVal(parser.treeList(fake)[0], 'type', type);
    });
    it('объект-коммит содержит корректное название элемента', () => {
      const fake = '100644 blob 9ae1e079d86c1132f4ff8b51606a840c56d0746f\tREADME.md\n';
      const name = 'README.md';

      assert.propertyVal(parser.treeList(fake)[0], 'name', name);
    });
  });
});
