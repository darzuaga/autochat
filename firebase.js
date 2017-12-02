var firebase = require('firebase')

require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDs_t2XWET-Dd8dUuYd1CIMvFyZj9zcLDk",
  authDomain: "salesdroid-a3474.firebaseapp.com",
  databaseURL: "https://salesdroid-a3474.firebaseio.com",
  projectId: "salesdroid-a3474",
  storageBucket: "salesdroid-a3474.appspot.com",
  messagingSenderId: "70746717017"
};

firebase.initializeApp(config);

var firestore = firebase.firestore();
var storage = firebase.storage()

export {firebase, firestore, storage};
