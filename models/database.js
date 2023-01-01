var mysql = require("mysql");
var db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "bc8ea6cff619c0",
  password: "6a013c5e",
  database: "heroku_5473ce749970e71",
});
db.connect(() => console.log("Da ket noi database !"));
module.exports = db;
