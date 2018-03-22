var express = require("express");
var router = express.Router();

var childProcess = require("child_process");

var config = require("../config");
var parser = require("../util/parser");

/* GET home page. */
router.get("/", function(req, res, next) {
  childProcess.exec("git branch --no-abbrev --column", {cwd: config.url}, (err, stdout, stderr) => {
     res.render("index", {title: "GIT-LOC", url: config.url, branches: parser.branchesList(stdout)});
      if(err) {
          console.log('err: ' + err);
      };
  });
});

module.exports = router;
