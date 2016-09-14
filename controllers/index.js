/*
* index.js
* load all other controllers and define paths which don't have a common prefix like a home page route
* */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
