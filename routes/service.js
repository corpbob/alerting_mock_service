child_process = require('child_process');
var express = require('express');
var router = express.Router();
var fs = require('fs');
 
sendFaultString = function(res){
      console.log("No such method");
      fs.readFile('data/fault.xml', 'utf8', function(err, contents) {
        console.log(contents);
        res.set('Content-Type', 'text/xml; charset=ISO-8859-1');
        res.send(contents);
      });
}


router.post('/', function(req, res, next) {
  var soap_action = req.headers['soapaction'];
  console.log(req.headers);
  if(soap_action){ 
    if(soap_action.indexOf('RegularRecharge') > -1){
      console.log('Using regularcharge');
      fs.readFile('data/reg_charge_resp.xml', 'utf8', function(err, contents) {
        console.log(contents);
        res.set('Content-Type', 'text/xml; charset=ISO-8859-1');
        res.send(contents);
      });
    }  else if (soap_action.indexOf('GetSubID') > -1){

      fs.readFile('data/subid_resp.xml', 'utf8', function(err, contents) {
        console.log(contents);
        res.set('Content-Type', 'text/xml; charset=ISO-8859-1');
        res.send(contents);
      });

    } else {
      sendFaultString(res);
    }
  } else {
    //read fault string  
    sendFaultString(res);
  }
  console.log(soap_action);
 
});

module.exports = router;
