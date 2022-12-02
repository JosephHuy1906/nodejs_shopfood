const express = require("express");
const router = express.Router();
const db = require("../models/database");
/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/product/cat/:id", (req, res) => {
  res.render("productId",{id:req.params.id});
});
router.get("/product/", (req, res) => {
  res.render("product");
});

router.get("/product/detail/:id", (req, res) => {
  res.render("detail", {idsp:req.params.id});
});

router.get("/login", function (req, res, next) {
  res.render("login");
});
router.get("/about", function (req, res, next) {
  res.render("vechungtoi");
});
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.get("/cart", function (req, res, next) {
  res.render("cart");
});
module.exports = router;
