const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyDUZQEQHDvLLmYdK9bqB-crKOFStpULkmk",
    authDomain: "g249api.firebaseapp.com",
    databaseURL: "https://g249api-default-rtdb.firebaseio.com",
    projectId: "g249api",
    storageBucket: "g249api.appspot.com",
    messagingSenderId: "966250425627",
    appId: "1:966250425627:web:096151ed1fd4dce5e077be",
    measurementId: "G-QW1PG8GZ59",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;
