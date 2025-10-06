const db = require("../config/db");

const insertTask = (Title, Description) => {
  const query = "INSERT INTO tasks (Title,Description) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    db.query(query, [Title, Description], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const getTask = () => {
  const query =
    "SELECT * FROM tasks WHERE Status = 0 ORDER BY created_at DESC LIMIT 5";
  return new Promise((resolve, reject) => {
    db.query(query, [], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

const updateTaskStatus = (idTask) => {
  const query = `UPDATE tasks SET Status=1 WHERE idTask=?`;

  return new Promise((resolve, reject) => {
    db.query(query, [idTask], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

module.exports = {
  insertTask,
  getTask,
  updateTaskStatus,
};
