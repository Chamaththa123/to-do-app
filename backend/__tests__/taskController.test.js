const { createTask, getTasks, markAsCompleted } = require("../controllers/taskController");
const taskDbService = require("../services/taskDbService");

jest.mock("../services/taskDbService");

describe("taskController", () => {
  let res;
  let req;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    req = { body: {}, params: {} };
    jest.clearAllMocks();
  });

  describe("createTask", () => {
    test("should return 400 if title is missing", async () => {
      req.body = { Title: "", Description: "desc" };
      await createTask(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Title is required" });
    });

    test("should call insertTask if valid data", async () => {
      req.body = { Title: "Task1", Description: "Desc" };
      taskDbService.insertTask.mockResolvedValue({});
      await createTask(req, res);
      expect(taskDbService.insertTask).toHaveBeenCalledWith("Task1", "Desc");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Task added successfully" });
    });
  });

  describe("getTasks", () => {
    test("should return tasks", async () => {
      const mockTasks = [{ idTask: 1, Title: "Task" }];
      taskDbService.getTask.mockResolvedValue(mockTasks);

      await getTasks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTasks);
    });
  });

  describe("markAsCompleted", () => {
    test("should return 400 if idTask is invalid", async () => {
      req.params = { idTask: "abc" };
      await markAsCompleted(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Valid task ID is required" });
    });

    test("should mark task as completed", async () => {
      req.params = { idTask: 1 };
      taskDbService.updateTaskStatus.mockResolvedValue({ affectedRows: 1 });

      await markAsCompleted(req, res);

      expect(taskDbService.updateTaskStatus).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "task mark as completed" });
    });

    test("should return 404 if task not found", async () => {
      req.params = { idTask: 2 };
      taskDbService.updateTaskStatus.mockResolvedValue({ affectedRows: 0 });

      await markAsCompleted(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Task not found" });
    });
  });
});
