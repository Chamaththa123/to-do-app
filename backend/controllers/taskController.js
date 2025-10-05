const taskDbService = require("../services/taskDbService");

const createTask = async (req, res) => {
  try {
    const { Title, Description } = req.body;
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
    await taskDbService.updateTaskStatus(idTask);
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
