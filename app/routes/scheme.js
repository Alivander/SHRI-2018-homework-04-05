var express = require("express");
var childProcess = require("child_process");

var config = require("../config");
var parser = require("../util/parser");

var options = {
  cwd: config.url,
  windowsHide: true
};

var renderBase = {
  title: "GIT-LOC",
  url: config.url,
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

};

var scheme = {

  index: function(req, res, next) {
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
    cpExec("git ls-tree " + req.params.branch)
      .then(treeString => {
        renderBase.branchCurrent = req.params.branch;
        res.render("branch", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  tree: function(req, res, next) {
    cpExec("git ls-tree " + req.params.branch)
      .then(treeString => {
        renderBase.path = [];
        renderBase.branchCurrent = req.params.branch;
        renderBase.tree = parser.treeList(treeString);
        res.render("tree", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  treeItem: function(req, res, next) {
    renderBase.path = [];
    if (req.params[0].indexOf("/")) {
      renderBase.path = req.params[0].split("/");
    } else {
      renderBase.path.push(req.params[0]);
    };
    cpExec("git ls-tree " + renderBase.path[renderBase.path.length - 1])
      .then(treeString => {
        renderBase.branchCurrent = req.params.branch;
        renderBase.tree = parser.treeList(treeString);
        res.render("tree", renderBase);
      })
      .catch(error => {
        cpExec("git cat-file -p " + renderBase.path[renderBase.path.length - 1])
          .then(file => {
            renderBase.file = file;
            res.render("file", renderBase);
          })
          .catch(error => {
            console.log('err: ' + error);
          });
      });
  },

  commits: function(req, res, next) {
    cpExec("git log " + req.params.branch + " --date=short --pretty=format:%H%ad%an----%f")
      .then(commitsString => {
        renderBase.path = [];
        renderBase.branchCurrent = req.params.branch;
        renderBase.commits = parser.commitsList(commitsString);
        res.render("commits", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  }

};

module.exports = scheme;
