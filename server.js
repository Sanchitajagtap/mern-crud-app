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
console.log("after");
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
