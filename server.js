require('babel-register')
var express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
// var React = require('react')
// var ReactDOMServer = require('react-router-dom')
var _ = require('lodash')
var fs = require('fs')
const util = require('util')

const admin = require('firebase-admin');
// // Required for side-effects
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
//
// // Initialize Cloud Firestore through Firebase
var db = admin.firestore();

var usersRef = db.collection("users/3j5UTx1lflT0FNB3Cf0h8OL19wd2/automations");

// var StaticRouter = ReactRouter.StaticRouter
var port = 3000
var baseTemplate = fs.readFileSync('./index.html')
// var template = _.template(baseTemplate)

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/public', express.static('./public'))

// server.use((req, res) => {
//     var context = {}
//     var body = ReactDOMServer(StaticRouter, { location: req.url, context },
//         React.createElement(App)
//     )
// })

app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'verify_token') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

app.post('/webhook', function (req, res) {
  var data = req.body;
  // console.log('data');
  // console.log(util.inspect(data, {showHidden: false, depth: null}))
  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      if(entry.standby){
          switch(entry.standby[0].postback.title){
              case 'Get Started':
                console.log('get started message');
                break;
          }
      }

      // Iterate over each messaging event
      entry.messaging.forEach((event) => {
        if (event.message) {

            db.collection(`pages/${pageID}/automations`).get().then(snap => {
                snap.forEach(doc => {
                    doc.data().event_elements.map(ev => {
                        if (ev.name == 'KEYWORD' && ev.text == event.message.text){
                            sendGenericMessage(event.sender.id, doc.data().action_elements);
                        }
                    })
                })
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

        //   receivedMessage(event);
      } else if (event.postback){
          receivedPostback(event)
      } else {
        //   console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

function receivedMessage(event) {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  // console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
  // console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generics':
        sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}

function sendGenericMessage(recipientId, msg_payload) {
    console.log('payload');
    console.log(msg_payload);

    var messageData;

    msg_payload.forEach(msg => {
        switch(msg.name){
            case 'TextMessage':
                messageData = {
                    recipient: {
                        id: recipientId
                    },
                    message: {
                        text: msg.text
                    }
                };
                callSendAPI(messageData);
                break;
            case 'Image':
                messageData = {
                    recipient: {
                        id: recipientId
                    },
                    message: {
                        attachment: {
                            type: "image",
                            payload: {
                                url: msg.url,
                                is_reusable:true
                            }
                        }
                    }
                };
                callSendAPI(messageData);
                break;
        }
    })
}

function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  // console.log("Received postback for user %d and page %d with payload '%s' " + "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  sendTextMessage(senderID, "Postback called");
}

function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAB7qTjdCG8BAExP9g8SRUhAvGtcsbf5pCZCoUtECZBv2ncCGcovU9T2jZApcP88ZCHS66LbA6ZAnQmLCLsZAd4FR3sO2i56cvKD5ZCj2KJ67iqjOJgQA63wZBKXRpikZBLZBDTvvux0mOHefZAuyEs7Vn1RrITBqeWRt5XFrENr3MoogZDZD' },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

    //   console.log("Successfully sent generic message with id %s to recipient %s", messageId, recipientId);
    } else {
      console.error("Unable to send message.");
    //   console.error(response);
      console.error(error);
    }
  });
}

console.log(`listening on port ${port}`);
app.listen(port)
