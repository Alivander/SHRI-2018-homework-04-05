var parser = {

  branchesList: (str) => {
    var str = str.split("");
    var branches = [];
    var number = 0;
    var pass = false;

    str.forEach((s) => {
      if (s !== "*" && s !== " ") {
        if (pass === true) {
          if (branches[number]) {
            number++;
          };
          pass = false;
        };
        if (branches[number]) {
          branches[number] += s;
        } else {
          branches[number] = s;
        };
      } else {
        pass = true;
      };
    });

    branches.sort();
    branches.splice([branches.lastIndexOf("master")], 1);
    branches.unshift("master");

    return branches;
  },

  commitsList: (str) => {
    var hashLenght = 40;
    var dateLenght = 10;
    var commitsResults = str.split("\n");
    var commits = [];

    commitsResults.pop();

    commitsResults.forEach((r) => {
      var mark = r.indexOf("----", 0);
      var markLength = 4;

      commits.push({
        hash: r.slice(0, hashLenght),
        date: r.slice(hashLenght, hashLenght + dateLenght),
        author: r.slice(hashLenght + dateLenght, mark),
        message: r.slice(mark + markLength, r.length)
      });
    });

    return commits;
  },

  treeList: (str) => {
    var modeLenght = 6;
    var typeLength = 4;
    var treeResults = str.split("\n");
    var treeFolder = [];
    var treeFiles = [];
    var tree = [];

    treeResults.pop();

    treeResults.forEach((r) => {
      var item = {
        type: r.slice(modeLenght + 1, modeLenght + 1 + typeLength),
        name: r.slice(r.indexOf("\t") + 1, r.length)
      };
      (item.type === "tree") ? treeFolder.push(item) : treeFiles.push(item);
    });

    tree = treeFolder.concat(treeFiles);

    return tree;
  }
};

module.exports = parser;
