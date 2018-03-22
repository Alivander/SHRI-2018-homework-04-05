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
  }
};

module.exports = parser;
