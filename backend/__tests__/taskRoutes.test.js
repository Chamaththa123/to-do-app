const request = require("supertest");
const express = require("express");
const taskRoutes = require("../routes/taskRoute");

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

describe("Task API Routes", () => {
  test("GET /api/tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
  });
});
