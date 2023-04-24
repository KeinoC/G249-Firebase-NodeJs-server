const express = require("express");
const cors = require("cors");
const firebase = require("firebase");
require("firebase/auth");
const admin = require("firebase-admin");

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
admin.initializeApp(firebaseConfig); // Initialize Firebase Admin SDK

const db = firebase.firestore();
const User = db.collection("Users");
const auth = firebase.auth();

const app = express();
app.use(express.json());
app.use(cors());

// Example route for user registration
app.post("/users", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userRecord = await admin.auth().createUser({
            // Use Firebase Admin SDK to create user
            email: email,
            password: password,
        });
        console.log("Successfully created new user:", userRecord.uid);
        await User.add({ email: userRecord.email }); // Add user to Firestore collection
        res.send({ msg: "User registered successfully" });
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).send({ error: error.message });
    }
});

app.get("/", async (req, res) => {
    const snapshot = await User.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
});

app.post("/create", async (req, res) => {
    const data = req.body;
    await User.add({ data });
    res.send({ msg: "User Added" });
});

app.post("/update", async (req, res) => {
    const id = req.body.id;
    delete req.body.id;
    const data = req.body;
    await User.doc(id).update(data);
    res.send({ msg: "Updated" });
});

app.post("/delete", async (req, res) => {
    const id = req.body.id;
    await User.doc(id).delete();
    res.send({ msg: "Deleted" });
});

app.listen(4000, () => console.log("Up & Running on port 4000"));
