
const {  dialogflow  } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');
const appInsights = require("applicationinsights");
appInsights.setup("adcf71ad-2172-4ac9-a530-6cd723955bff");
appInsights.start();
const app = dialogflow({debug:true});

app.intent('Default Welcome Intent', conv => {
    
  conv.ask('Hello Judith, Welcome to Appointment Checker. You can say things such as Make an appointment or Check an appointment.')
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});
  
const expressApp = express().use(bodyParser.json())
expressApp.post('/fulfillment', app)
var port=process.env.PORT||3000;
expressApp.listen(port);

