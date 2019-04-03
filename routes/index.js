var express = require('express');
var router = express.Router();
var instance= '0';
if(process.env.INSTANCE){
  instance = process.env.INSTANCE;
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', instance: instance });
});

module.exports = router;
