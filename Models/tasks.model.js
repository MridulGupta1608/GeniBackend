const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  due: {
    type: Date,
    required: false,
  },
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
