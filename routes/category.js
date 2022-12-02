const express = require("express");
const router = express.Router();
const db = require("../models/database");
const modelsProduct = require("../models/category");

router.get("/", (req, res) => {
  modelsProduct.list(function (listcate) {
    res.json(listcate);
  });
});
router.post("/", (req, res) => {
  let data = req.body;
  modelsProduct.create(data, function () {
    res.json({ thongbao: "Đã thêm  xong một user mới" });
  });
});
router.get("/cat/:id", (req, res) => {
  let id = req.params.id;
  modelsProduct.read(id, function (u) {
    res.json(u);
  });
});
router.put("/:id", (req, res) => {
  let data = req.body;
  let id = req.params.id;
  modelsProduct.update(id, data, function () {
    res.json({ thongbao: "Đã cập nhật user " });
  });
});
module.exports = router;
