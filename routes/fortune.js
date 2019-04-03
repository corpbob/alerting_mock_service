child_process = require('child_process');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var soap_action = req.headers['SOAPAction'];
  console.log(soap_action);
  var fortune = child_process.execSync('fortune');
  res.send(fortune.toString() + '\n');
});

router.post('/', function(req, res, next) {
  var soap_action = req.headers['SOAPAction'];
  console.log(soap_action);
  var fortune = child_process.execSync('fortune');
  res.send(fortune.toString() + '\n');
});

module.exports = router;
