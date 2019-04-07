child_process = require('child_process');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var twilio = require('twilio');

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var sendingNumber = process.env.TWILIO_NUMBER;
var sendToNumbers=process.env.SEND_TO_NUMBERS;

function valid(){
  return accountSid && authToken && sendingNumber && sendToNumbers;
}

router.post('/', function(req, res, next) {
  if(valid()){
    var twilio = require('twilio');
    
    var client = new twilio(accountSid, authToken);
    
    console.log("Sending SMS");
    
    client.messages.create({
        body: 'Hello from Node',
        to: sendToNumbers,   // Text this number
        from: sendingNumber  // From a valid Twilio number
    })
    .then((message) => console.log(message.sid));
  
    console.log("Done calling send");
  } else {
    console.log("Invalid inputs");
  }
 
  res.status(200).end();

});

module.exports = router;
