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
  url: config.url
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

  indexModel: function(req, res, next) {
    cpExec("git branch --no-abbrev --column")
      .then(brunchesString => {
        renderBase.branches = parser.branchesList(brunchesString);
        res.render("index", renderBase);
      })
      .catch(error => {
        console.log('err: ' + error);
      });
  },

  branchModel: function(req, res, next) {
    Promise.all([
      cpExec("git log " + req.params.branch + " --date=short --pretty=format:%H%ad%an----%f"),
      cpExec("git ls-tree " + req.params.branch)
    ])
    .then(results => {
      renderBase.branchCurrent = req.params.branch;
      renderBase.commits = parser.commitsList(results[0]);
      renderBase.tree = parser.treeList(results[1]);
      res.render("branch", renderBase);
    })
    .catch(error => {
      console.log('err: ' + error);
    });
  }

};

module.exports = scheme;
