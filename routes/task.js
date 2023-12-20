const express = require("express");
const router = express.Router();
const Task = require("../Models/tasks.model");
const verifyToken = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const task = await Task.find();
    res.send(task);
  } catch (error) {
    Task;
    console.log(error.message);
    res.send({
      message: "Some error",
      success: false,
    });
  }
});

router.post("/", async (req, res) => {
  const task = new Task({
    task: req.body.task,
    desc: req.body.desc,
    due: req.body.due,
  });

  task
    .save()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const updatedTask = {};

    if (req.body.task) {
      updatedTask.task = req.body.task;
    }

    if (req.body.desc) {
      updatedTask.desc = req.body.desc;
    }

    if (req.body.due) {
      updatedTask.due = req.body.due;
    }

    const result = await Task.findByIdAndUpdate(taskId, updatedTask, {
      new: true,
    });

    if (!result) {
      return res.status(404).send("Task not found");
    }

    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.completed(404).send("Task not found");
    }
    res.send(`Task ${taskId} deleted successfully`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
