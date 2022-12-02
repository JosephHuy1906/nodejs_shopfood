var db = require("./database");

exports.list = function (callback) {
  let sql = "SELECT * FROM products ORDER BY RAND()  LIMIT 12";
  db.query(sql, function (err, d) {
    callback(d);
  });
};
exports.listRamdom = function (callback) {
  let sql = "SELECT * FROM products ORDER BY RAND()  LIMIT 4";
  db.query(sql, function (err, d) {
    callback(d);
  });
};
exports.listNew = function (callback) {
  let sql = "SELECT * FROM products ORDER BY id DESC  LIMIT 4";
  db.query(sql, function (err, d) {
    callback(d);
  });
};
exports.listViews = function (callback) {
    let sql = "SELECT * FROM products ORDER BY view DESC  LIMIT 4";
    db.query(sql, function (err, d) {
      callback(d);
    });
  };
exports.listId = function (id, callback) {
  let sql = "SELECT * FROM products WHERE iddanhmuc = ?";
  db.query(sql, id, function (err, d) {
    callback(d);
  });
};
exports.create = function (data, callback) {
  //hàm chèn user mới vào table
  let sql = "INSERT INTO products SET ?";
  db.query(sql, data, function (err, d) {
    callback(d);
  });
};
exports.update = function (id, data, callback) {
  let sql = "UPDATE products  SET ? WHERE id = ?";
  db.query(sql, [data, id], (err, d) => {
    if (err) throw err;
    callback();
  });
};
exports.read = function (id, callback) {
  let sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, id, (err, d) => {
    data = d[0];
    callback(data);
  });
};
