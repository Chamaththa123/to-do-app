const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.NODE_ENV === "test" 
    ? (process.env.DB_TEST_NAME || "todo_app_test_db")
    : (process.env.DB_NAME || "todo_app_db")
});

console.log(process.env.NODE_ENV)

connection.connect((err) => {
  if (err) console.error("Error connecting to DB:", err);
  else console.log(`Database connected successfully! (${connection.config.database})`);
});

module.exports = connection;
