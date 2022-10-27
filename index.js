const express = require("express");
const mongoose = require("mongoose");
const task = require("../server/models/task");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
// app.use(bodyParser());
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
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
    .create(data)
    .then((response) => res.send("success"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("not success");
    });
});

app.get("/tasks", async (req, res) => {
  await task
    .find()
    .then((response) => res.send(response))
    .catch((err) => {
      console.log(err);
      res.status(500).send("not success");
    });
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await task
    .findByIdAndUpdate(
      { _id: id },
      {
        $set: data,
      }
    )
    .then((response) => res.send("success"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("not success");
    });
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await task
    .findByIdAndDelete({ _id: id })
    .then((response) => res.send("success"))
    .catch((err) => {
      console.log(err);
      res.status(500).send("not success");
    });
});

app.get("/", async (req, res) => {
  //   await tasks.create(req.data).then((res) => res.send("success"));
  res.send("working");
});
