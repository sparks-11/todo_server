const mongoose = require("mongoose");

const task = new mongoose.Schema({
  task: String,
  completed: Boolean,
  date: String,
});

module.exports = mongoose.model("task", task);
