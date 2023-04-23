const express = require("express");
const cors = require("cors");
const User = require("./config");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    const snapshot = await User.get(); // cant use await without async
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); /// id dont naturally come with the data object, the spread is to add it
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
