var mysql = require("mysql");
var db = mysql.createConnection({
  host: "us-cdbr-east-06.cleardb.net",
  user: "b085e9ba8811d4",
  password: "50fd3802",
  database: "heroku_a09b9395670425d",
});
db.connect(() => console.log("Da ket noi database !"));
module.exports = db;
