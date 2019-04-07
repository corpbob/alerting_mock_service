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
  var content = req.body;
  console.log(content);

  var message="Alert: " + content.commonAnnotations.summary + ", severity: " + content.commonLabels.severity + ", status: " + content.status;
  console.log(message);

  if(valid()){

    var twilio = require('twilio');
    
    var client = new twilio(accountSid, authToken);
    
    console.log("Sending SMS");

    var numbers = sendToNumbers.split(",")    
    if(numbers && numbers.length > 0){
      numbers.forEach(function(phoneNumber){
        console.log("Sending to ", phoneNumber);
        var payload = {
            body: message,
            to: phoneNumber,   // Text this number
            from: sendingNumber  // From a valid Twilio number
        }
        console.log(payload);

        if(true){ 
          client.messages.create(payload)
          .then((message) => console.log(message.sid));
        }
      });
    }
  
    console.log("Done calling send");
  } else {
    console.log("Invalid inputs");
  }
 
  res.status(200).end();

});

module.exports = router;
