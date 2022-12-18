var db = require("./database");

exports.list = function (callback) {
  let sql = "SELECT * FROM users";
  db.query(sql);
};

exports.create = function (data, callback) {
  //hàm chèn users mới vào table
  let sql = "INSERT INTO users SET ?";
  db.query(sql, data);
};
exports.update = function (id, data, callback) {
  let sql = "UPDATE users  SET ? WHERE username = ?";
  db.query(sql, [data, id], (err, d) => {
    if (err) throw err;
    callback();
  });
};
exports.read = function (u, callback) {
  let sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, u, (err, d) => {
    console.log("d=", d.length);
    data = d;
    callback(data);
  });
};
exports.searchEmail = function (u, callback) {
  let sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, u, (err, d) => {
    console.log("email=", d.length);
    data = d;
    callback(data);
  });
};
exports.searchcode = function (u, callback) {
  let sql = "SELECT * FROM users WHERE code = ?";
  db.query(sql, u, (err, d) => {
    console.log("code=", d.length);
    data = d;
    callback(data);
  });
};
