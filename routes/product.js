const express = require("express");
const router = express.Router();
const db = require("./../models/database");
const modelsProduct = require("./../models/product");

router.get("/cat/:id", (req, res) => {
  let id = req.params.id;
  modelsProduct.listId(id, function (listID) {
    res.json(listID);
  });
});
router.post("/", (req, res) => {
  let data = req.body;
  modelsProduct.create(data, function () {
    res.json({ thongbao: "Đã thêm  xong một user mới" });
  });
});
router.get("/detail/:id", (req, res) => {
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
router.get("/", (req, res) => {
  modelsProduct.list(function (list) {
    res.json(list);
  });
});
router.get("/hot", (req, res) => {
  modelsProduct.listRamdom(function (list) {
    res.json(list);
  });
});
router.get("/new", (req, res) => {
  modelsProduct.listNew(function (list) {
    res.json(list);
  });
});
router.get("/view", (req, res) => {
  modelsProduct.listViews(function (list) {
    res.json(list);
  });
});
router.post('/search_', (req, res) => {
  const search = req.body.search;
  modelsProduct.search(search, function (err,list) {
    res.json(list)
  })
})
module.exports = router;
