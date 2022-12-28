const { MongoClient, ServerApiVersion, ObjectID } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGO_DB_CONNECTION_URL, {
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
  console.log("connection success", db);
});

const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post("/e-user", (req, res) => {
  db.collection("users").insertOne(req.body, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("1 document inserted", result);
    res.send(result);
  });
});

app.put("/e-user/:id", (req, res) => {
  console.log("put", req.body, req.params);
  const filterQuery = { _id: ObjectID(req.params.id) };
  const updateQuery = {
    $set: { ...req.body },
  };
  db.collection("users").updateOne(
    filterQuery,
    updateQuery,
    function (err, result) {
      if (err) {
        console.log(err);
      }
      console.log("1 document updated", result);
      res.send(result);
    }
  );
});

app.delete("/e-user/:id", (req, res) => {
  console.log("delete", req.body, req.params);
  const deleteQuery = {
    _id: ObjectID(req.params.id),
  };
  db.collection("users").deleteOne(deleteQuery, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log("1 document deleted", result);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
