child_process = require('child_process');
var express = require('express');
var router = express.Router();
var fs = require('fs');
 
router.post('/', function(req, res, next) {
  console.log(req.body);
  res.status(200).end();
});

module.exports = router;
