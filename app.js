const appInsights = require("applicationinsights");
appInsights.setup("9c9a6df0-c952-4c4d-bf57-908177a7268c");
appInsights.start();
const {  dialogflow  } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');

const app = dialogflow({debug:true});

app.intent('Default Welcome Intecd..Default Fallback Intentnt', conv => {
  conv.ask('Hello Judith, Welcome to Appointment Checker. You can say things such as Make an appointment or Check an appointment.')
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});
  
const expressApp = express().use(bodyParser.json())
expressApp.post('/fulfillment', app)
var port=process.env.PORT||3000;
expressApp.listen(port);

