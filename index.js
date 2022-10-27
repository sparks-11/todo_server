const express = require("express");
const mongoose = require("mongoose");
const task = require("../server/models/task");
const bodyParser = require("body-parser");

const app = express();
// app.use(bodyParser());
app.use(express.json());
app.listen(7000, () => {
  console.log("running on 7000");
});

const dbConnection = async () => {
  await mongoose
    .connect(
      "mongodb+srv://sparks:8508903874v@cluster0.tfmlv.mongodb.net/?retryWrites=true&w=majority"
    )
    .then((res) => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
};
dbConnection();

app.post("/addTask", async (req, res) => {
  const data = req.body;
  console.log(data);
  await task
    .create(req.data)
    .then((resonse) => res.send("success"))
    .catch((err) => {
      console.log(err);
      res.send("not success");
    });
});

app.get("/tasks", async (req, res) => {
  await task
    .findAll()
    .then((resonse) => res.json({ data: resonse }))
    .catch((err) => {
      console.log(err);
      res.send("not success");
    });
});

app.get("/", async (req, res) => {
  //   await tasks.create(req.data).then((res) => res.send("success"));
  res.send("working");
});
