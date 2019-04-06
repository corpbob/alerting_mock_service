This project is a webhook to test prometheus alerting.

To call this:

curl -v -XPOST -H "Content-Type: application/json" http://127.0.0.1:3000/service -d <json input>
