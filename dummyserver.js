const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://root:root@cluster0.7dsumxt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
let db;
client.connect((err) => {
  if (err) {
    console.log("err", err);
  }

  db = client.db("e-comm");
  console.log("connection success",db)
  // const collection = client.db("e-comm").collection("users");
  // perform actions on the collection object
  //client.close();
});

const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("before");

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.get("/gretting", (req, res) => {
  console.log("Greeting");
  res.send("Hello World!");
});
//console.log("after");

app.get("/e-users", (req, res) => {
  console.log("0");
  db.collection("users")
    .find({})
    .toArray((err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
});

app.get("/users", (req, res) => {
  let users = [
    {
      name: "pranav",
      age: 32,
    },
    {
      name: "dipali",
      age: 30,
    },
  ];
  res.send(users);
});

app.post("/user", (req, res) => {
  let dataPassed = req.body;
  console.log("dataPassed", dataPassed);
  res.send({ status: 200, message: "OK" });
});

app.put("/user/:id", (req, res) => {
  let dataPassed = req.body;
  console.log("dataPassed", dataPassed);
  res.send({ status: 200, message: "OK" });
});

app.patch("/user/:id", (req, res) => {
  let dataPassed = req.body;
  console.log("dataPassed", dataPassed);
  res.send({ status: 200, message: "OK" });
});

app.delete("/user/:id", (req, res) => {
  let params = req.params;
  console.log("delete params", params);
  res.send({ status: 200, message: "deleted record" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
