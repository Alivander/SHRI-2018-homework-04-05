const parser = {

  branchesList: (str) => {
    const simbols = str.split('');
    const branches = [];
    let number = 0;
    let pass = false;

    simbols.forEach((s) => {
      if (s !== '*' && s !== ' ') {
        if (pass === true) {
          if (branches[number]) {
            number += 1;
          }
          pass = false;
        }
        if (branches[number]) {
          branches[number] += s;
        } else {
          branches[number] = s;
        }
      } else {
        pass = true;
      }
    });

    branches.sort();
    branches.splice([branches.lastIndexOf('master')], 1);
    branches.unshift('master');

    return branches;
  },

  commitsList: (str) => {
    const hashLenght = 40;
    const dateLenght = 10;
    const commitsResults = str.split('\n');
    const commits = [];

    commitsResults.pop();

    commitsResults.forEach((r) => {
      const mark = r.indexOf('----', 0);
      const markLength = 4;

      commits.push({
        hash: r.slice(0, hashLenght),
        date: r.slice(hashLenght, hashLenght + dateLenght),
        author: r.slice(hashLenght + dateLenght, mark),
        message: r.slice(mark + markLength, r.length),
      });
    });

    return commits;
  },

  treeList: (str) => {
    const modeLenght = 6;
    const typeLength = 4;
    const hashLenght = 40;
    const treeResults = str.split('\n');
    const treeFolder = [];
    const treeFiles = [];
    let tree = [];

    treeResults.pop();

    treeResults.forEach((r) => {
      const item = {
        type: r.substr(modeLenght + 1, typeLength),
        hash: r.substr(modeLenght + 1 + typeLength + 1, hashLenght),
        name: r.slice(r.indexOf('\t') + 1, r.length),
      };
      if (item.type === 'tree') {
        treeFolder.push(item);
      } else {
        treeFiles.push(item);
      }
    });

    tree = treeFolder.concat(treeFiles);

    return tree;
  },
};

module.exports = parser;
