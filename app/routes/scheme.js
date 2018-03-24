var express = require("express");
var childProcess = require("child_process");

var config = require("../config");
var parser = require("../util/parser");

var options = {
  cwd: config.url,
  windowsHide: true
};

function cpExec(command) {

  return new Promise(function(resolve, reject) {

    childProcess.exec(command, options,  (err, stdout, stderr) => {
        if (err) {
          return reject(err);
        };
        resolve(stdout);
    });

  });

}

var scheme = {

  index: function(req, res, next) {
    var renderBase = {
      title: "GIT-LOC",
      url: config.url
    };
    cpExec("git branch --no-abbrev --column")
      .then(brunchesString => {
        renderBase.branches = parser.branchesList(brunchesString);
        res.render("index", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  branch: function(req, res, next) {
    var renderBase = {
      title: "GIT-LOC",
      url: config.url,
      branchCurrent: req.params.branch
    };
    cpExec("git ls-tree " + req.params.branch)
      .then(treeString => {
        res.render("branch", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  tree: function(req, res, next) {
    var renderBase = {
      title: "GIT-LOC",
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: "tree",
      path: []
    };
    cpExec("git ls-tree " + req.params.branch)
      .then(treeString => {
        renderBase.tree = parser.treeList(treeString);
        res.render("tree", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  itemTree: function(req, res, next) {
    var renderBase = {
      title: "GIT-LOC",
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: "tree",
      path: (req.params[0].indexOf("/")) ? req.params[0].split("/") : req.params[0]
    };
    cpExec("git ls-tree " + renderBase.branchCurrent + " " + req.params[0])
      .then(currentItemString => {
        var arr = parser.treeList(currentItemString);
        return renderBase.currentItem = arr[0].hash;
      })
      .then(current => {
        cpExec("git ls-tree " + renderBase.currentItem)
          .then(treeString => {
            renderBase.tree = parser.treeList(treeString);
            res.render("tree", renderBase);
          })
          .catch(error => {
            cpExec("git cat-file -p " + renderBase.currentItem)
              .then(file => {
                renderBase.file = file;
                res.render("file", renderBase);
              })
              .catch(error => {
                console.log('err: ' + error);
              });
          });
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  commits: function(req, res, next) {
    var renderBase = {
      title: "GIT-LOC",
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: "commits",
      path: []
    };
    cpExec("git log " + req.params.branch + " --date=short --pretty=format:%H%ad%an----%f")
      .then(commitsString => {
        renderBase.commits = parser.commitsList(commitsString);
        res.render("commits", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  commit: function(req, res, next) {
    var renderBase = {
      title: "GIT-LOC",
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: "commits",
      path: [req.params.commit],
      currentItem: req.params.commit
    };
    cpExec("git ls-tree " + req.params.commit)
      .then(treeString => {
        renderBase.tree = parser.treeList(treeString);
        res.render("tree", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  commitTree: function(req, res, next) {
    var renderBase = {
      title: "GIT-LOC",
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: "commits",
      commit: req.params.commit,
      path: (req.params[0].indexOf("/")) ? req.params[0].split("/") : req.params[0]
    };
    cpExec("git ls-tree " + req.params.commit + " " + req.params[0])
      .then(currentItemString => {
        var arr = parser.treeList(currentItemString);
        return renderBase.currentItem = arr[0].hash;
      })
      .then(current => {
        cpExec("git ls-tree " + renderBase.currentItem)
          .then(treeString => {
            renderBase.tree = parser.treeList(treeString);
            res.render("tree", renderBase);
          })
          .catch(error => {
            cpExec("git cat-file -p " + renderBase.currentItem)
              .then(file => {
                renderBase.file = file;
                res.render("file", renderBase);
              })
              .catch(error => {
                console.log('err: ' + error);
              });
          });
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  }

    // Promise.all([
    //   cpExec("git log " + req.params.branch + " --date=short --pretty=format:%H%ad%an----%f"),
    //   cpExec("git ls-tree " + req.params.itemTree)
    // ])
    // .then(results => {
    //   renderBase.branchCurrent = req.params.branch;
    //   renderBase.commits = parser.commitsList(results[0]);
    //   renderBase.tree = parser.treeList(results[1]);
    //   res.render("branch", renderBase);
    // })
    // .catch(error => {
    //   console.log('err: ' + error);
    // });
  //}

  // branch: function(req, res, next) {
  //   Promise.all([
  //     cpExec("git log " + req.params.branch + " --date=short --pretty=format:%H%ad%an----%f"),
  //     cpExec("git ls-tree " + req.params.branch)
  //   ])
  //   .then(results => {
  //     renderBase.branchCurrent = req.params.branch;
  //     renderBase.commits = parser.commitsList(results[0]);
  //     renderBase.tree = parser.treeList(results[1]);
  //     res.render("branch", renderBase);
  //   })
  //   .catch(error => {
  //     console.log('err: ' + error);
  //   });
  // },
  //

};

module.exports = scheme;
