const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  markAsCompleted
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:idTask", markAsCompleted);

module.exports = router;