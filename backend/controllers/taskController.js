const taskDbService = require("../services/taskDbService");

const createTask = async (req, res) => {
  try {
    const { Title, Description } = req.body;

    if (!Title || Title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!Description || Description.trim() === "") {
      return res.status(400).json({ message: "Description is required" });
    }

    await taskDbService.insertTask(Title, Description);
    res.status(200).json({
      message: "Task added successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Error :", error: err.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await taskDbService.getTask();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error :", error: err.message });
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { idTask } = req.params;

    if (!idTask || isNaN(idTask)) {
      return res.status(400).json({ message: "Valid task ID is required" });
    }

    const result= await taskDbService.updateTaskStatus(idTask);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "task mark as completed" });
  } catch (err) {
    res.status(500).json({ message: "Error ", error: err.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  markAsCompleted,
};
