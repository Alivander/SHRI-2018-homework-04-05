var express = require("express");
var router = express.Router();
var scheme = require("./scheme");

router.get("/", scheme.indexModel);

router.get("/:branch", scheme.branchModel);

module.exports = router;
