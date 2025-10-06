const taskDbService = require("../services/taskDbService");
const db = require("../config/db");

jest.mock("../config/db", () => ({
  query: jest.fn(),
}));

describe("taskDbService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("insertTask should insert a task", async () => {
    const mockResults = { insertId: 1 };
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockResults);
    });

    const result = await taskDbService.insertTask("Test Task", "Description");
    expect(result).toEqual(mockResults);
    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO tasks (Title,Description) VALUES (?, ?)",
      ["Test Task", "Description"],
      expect.any(Function)
    );
  });

  test("getTask should return tasks", async () => {
    const mockResults = [{ idTask: 1, Title: "Test", Description: "Desc", Status: 0 }];
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockResults);
    });

    const result = await taskDbService.getTask();
    expect(result).toEqual(mockResults);
    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM tasks WHERE Status = 0 ORDER BY created_at DESC LIMIT 5",
      [],
      expect.any(Function)
    );
  });

  test("updateTaskStatus should update a task status", async () => {
    const mockResults = { affectedRows: 1 };
    db.query.mockImplementation((query, params, callback) => {
      callback(null, mockResults);
    });

    const result = await taskDbService.updateTaskStatus(1);
    expect(result).toEqual(mockResults);
    expect(db.query).toHaveBeenCalledWith(
      "UPDATE tasks SET Status=1 WHERE idTask=?",
      [1],
      expect.any(Function)
    );
  });
});
