/* eslint-disable no-unused-vars, no-console */
/* for parametrs router (req, res, next) and errorsin con */

const childProcess = require('child_process');

const config = require('../config');
const parser = require('../util/parser');

function cpExec(cmd) {
  return new Promise(((resolve, reject) => {
    const ops = {
      cwd: config.url,
      windowsHide: true,
    };
    childProcess.exec(cmd, ops, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      return resolve(stdout);
    });
  }));
}

const scheme = {

  index(req, res, next) {
    const renderBase = {
      title: 'GIT-LOC',
      url: config.url,
    };
    cpExec('git branch --no-abbrev --column')
      .then((brunchesString) => {
        renderBase.branches = parser.branchesList(brunchesString);
        res.render('index', renderBase);
      })
      .catch((error) => {
        console.log(`err: ${error}`);
      });
  },

  branch(req, res, next) {
    const renderBase = {
      title: 'GIT-LOC',
      url: config.url,
      branchCurrent: req.params.branch,
    };
    cpExec(`git ls-tree ${req.params.branch}`)
      .then((treeString) => {
        res.render('branch', renderBase);
      })
      .catch((error) => {
        console.log(`err: ${error}`);
      });
  },

  tree(req, res, next) {
    const renderBase = {
      title: 'GIT-LOC',
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: 'tree',
      path: [],
    };
    cpExec(`git ls-tree ${req.params.branch}`)
      .then((treeString) => {
        renderBase.tree = parser.treeList(treeString);
        res.render('tree', renderBase);
      })
      .catch((error) => {
        console.log(`err: ${error}`);
      });
  },

  itemTree(req, res, next) {
    const renderBase = {
      title: 'GIT-LOC',
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: 'tree',
      path: (req.params[0].indexOf('/')) ? req.params[0].split('/') : req.params[0],
    };
    cpExec(`git ls-tree ${renderBase.branchCurrent} ${req.params[0]}`)
      .then((currentItemString) => {
        const arr = parser.treeList(currentItemString);
        renderBase.currentItem = arr[0].hash;
        return renderBase.currentItem;
      })
      .then((current) => {
        cpExec(`git ls-tree ${current}`)
          .then((treeString) => {
            renderBase.tree = parser.treeList(treeString);
            res.render('tree', renderBase);
          })
          .catch((error) => {
            cpExec(`git cat-file -p ${renderBase.currentItem}`)
              .then((file) => {
                renderBase.file = file;
                res.render('file', renderBase);
              })
              .catch((err) => {
                console.log(`err: ${err}`);
              });
          });
      })
      .catch((error) => {
        console.log(`err: ${error}`);
      });
  },

  commits(req, res, next) {
    const renderBase = {
      title: 'GIT-LOC',
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: 'commits',
      path: [],
    };
    cpExec(`git log ${req.params.branch} --date=short --pretty=format:%H%ad%an----%f`)
      .then((commitsString) => {
        renderBase.commits = parser.commitsList(commitsString);
        res.render('commits', renderBase);
      })
      .catch((error) => {
        console.log(`err: ${error}`);
      });
  },

  commit(req, res, next) {
    const renderBase = {
      title: 'GIT-LOC',
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: 'commits',
      path: [req.params.commit],
      currentItem: req.params.commit,
    };
    cpExec(`git ls-tree ${req.params.commit}`)
      .then((treeString) => {
        renderBase.tree = parser.treeList(treeString);
        res.render('tree', renderBase);
      })
      .catch((error) => {
        console.log(`err: ${error}`);
      });
  },

  commitTree(req, res, next) {
    const renderBase = {
      title: 'GIT-LOC',
      url: config.url,
      branchCurrent: req.params.branch,
      catalog: 'commits',
      commit: req.params.commit,
      path: (req.params[0].indexOf('/')) ? req.params[0].split('/') : req.params[0],
    };
    cpExec(`git ls-tree ${req.params.commit} ${req.params[0]}`)
      .then((currentItemString) => {
        const arr = parser.treeList(currentItemString);
        renderBase.currentItem = arr[0].hash;
        return renderBase.currentItem;
      })
      .then((current) => {
        cpExec(`git ls-tree ${current}`)
          .then((treeString) => {
            renderBase.tree = parser.treeList(treeString);
            res.render('tree', renderBase);
          })
          .catch((error) => {
            cpExec(`git cat-file -p ${renderBase.currentItem}`)
              .then((file) => {
                renderBase.file = file;
                res.render('file', renderBase);
              })
              .catch((err) => {
                console.log(`err: ${err}`);
              });
          });
      })
      .catch((error) => {
        console.log(`err: ${error}`);
      });
  },

};

module.exports = scheme;

/* eslint-enable no-unused-vars */
