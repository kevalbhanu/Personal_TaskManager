const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { jwtAuthMiddleware } = require("../middleware/jwt");

//@desc Create Task
//@route /api/task/create
router.post("/create", async (req, res) => {
  try {
    const data = req.body;
    const task = new Task(data);
    const response = await task.save();
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
});

//@desc Update Task
//@route /api/task/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const response = await Task.findByIdAndUpdate(id, data);
    res.status(200).json({
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
});

//@desc Get Tasks
//@route /api/task/get
router.get("/get", async (req, res) => {
  try {
    const response = await Task.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
});

//@desc Delete Task
//@route /api/task/delete
router.delete("/delete/:id",  async (req, res) => {
  try {
    const responce = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      responce,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
});

//@desc Search Task
//@route /api/task/search
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const tasks = await Task.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(
      tasks);
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
});

module.exports = router;
