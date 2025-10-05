require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 8000;
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
};

app.use(cors(corsOptions));
app.use(express.json());

// routes
const taskRoutes = require("./routes/taskRoute");
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
