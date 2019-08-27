

//----- Enable telemetry collection with Application Insights --------------------//
var ai = require('applicationinsights');
ai.setup(process.env.APPLICATIONINSIGHTSKEY || 'e48dae5c-e538-4317-bc50-18a8a844e5d2')
    .setAutoDependencyCorrelation(true)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .setSendLiveMetrics(true)
    .start();

let client =ai.defaultClient;

//--------- skill response code for deafult intents  - B E G I N  --------------//
const {  dialogflow  } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');
const app = dialogflow({debug:true});

app.intent('Default Welcome Intent', conv => {
  conv.ask('Welcome to Appointment Checker. You can say things such as Make an appointment or Check an appointment.')
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});
//-----------  skill response code for deafult intents  - E N D  --------------//


//---------- This responds a POST request for the intent request -----------------//
const expressApp = express().use(bodyParser.json())
expressApp.post('/fulfillment', app)
const newLocal = 3000;
var port=process.env.PORT||newLocal;
expressApp.listen(port);

