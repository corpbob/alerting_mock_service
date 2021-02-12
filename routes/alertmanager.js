child_process = require('child_process');
var express = require('express');
var router = express.Router();
var fs = require('fs');

var towerhost = process.env.TOWER_HOST;
var alert_manager_url = process.env.ALERT_MANAGER_URL;

router.post('/', function(req, res, next) {
  var content = req.body;
  console.log(content);

  payload =  
  { 
    "status": "status",
    "labels": {
      "alertname": "Workflow",
      "service": "awx",
      "severity": "info",
      "instance": "awx",
      "status": "status",
      "team": "gyro-success"
    },
    "annotations": { 
      "description": "description"
    }
  };

  if(null != content){
    body = content.body;
    if(null != body){
      if(body.includes("approval")){
        if(body.includes("review")){
          payload.status = "review";
          payload.labels.status = "review";
        } else if (body.includes("approved")) {
          payload.status="approved";
          payload.labels.status = "approved";
        } else if (body.includes("denied")){
          payload.status="denied";
          payload.labels.status = "denied";
        }
        payload.annotations.description= body.replace("towerhost", towerhost);
      }

      if(body.includes("Workflow job summary")){
        payload.status = content.status;
        payload.labels.status = content.status;
        payload.labels.alertname = content.name;
        payload.annotations.description = content.created_by + " : " + body;
      }
    }
    console.log('curl -v -XPOST -H \"Content-Type: application/json\" ' + alert_manager_url + " -d '" + JSON.stringify([payload]) + "'");
    //var fortune = child_process.execSync('curl -v -H "Content-Type: application/json" ' + alert_manager_url + " -d '" + stringify(payload) + "'");
  }
  res.status(200).end();

});

module.exports = router;
