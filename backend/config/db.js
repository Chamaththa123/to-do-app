const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "to_do",
});

connection.connect((err) => {
  if (err) {
    console.error("Error when connecting to the database!");
  } else {
    console.log("The database established successfully!");
  }
});

module.exports = connection;