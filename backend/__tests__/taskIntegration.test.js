const request = require("supertest");
const express = require("express");
const taskRoutes = require("../routes/taskRoute");
const db = require("../config/db");

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

beforeAll((done) => {
  db.query("DELETE FROM tasks", () => {
    done();
    console.log('success')
  });
});

afterAll((done) => {
  db.end();
  done();
});

describe("Task API Integration Tests", () => {
  let taskId;

  test("POST /api/tasks - should create a task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ Title: "Integration Task", Description: "Test Integration" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task added successfully");

    const [task] = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tasks WHERE Title=?", ["Integration Task"], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    taskId = task.idTask;
  });

  test("GET /api/tasks - should return tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("Title", "Integration Task");
  });

  test("PATCH /api/tasks/complete/:idTask - should mark task completed", async () => {
    const res = await request(app).patch(`/api/tasks/complete/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("task mark as completed");

    const [task] = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tasks WHERE idTask=?", [taskId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
    expect(task.Status).toBe(1);
  });
});
