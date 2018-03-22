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
    var commits = [];
    var number = 0;

    for (var i = 0; i < str.length - hashLenght; i++) {
      var start = str.indexOf("+++", i) + 3;
      var end = str.indexOf("+++", start);
      var commitStr = str.slice(start, end);

      var hash = commitStr.slice(0, hashLenght);
      commitStr = commitStr.slice(hashLenght, commitStr.lenght);
      var date = commitStr.slice(0, dateLenght);
      commitStr = commitStr.slice(dateLenght, commitStr.lenght);
      var author = commitStr.slice(0, commitStr.indexOf("----", 0));
      commitStr = commitStr.slice(commitStr.indexOf("----", 0) + 4, commitStr.lenght);
      var message = commitStr;

      commits[number] = {
        hash: hash,
        date: date,
        author: author,
        message: message
      };

      i = end + 3;
      number++;
    };

    return commits;
  }
};

module.exports = parser;
