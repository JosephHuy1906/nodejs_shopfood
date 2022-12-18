const express = require("express");
const router = express.Router();
const db = require("../models/database");
/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("index", { avata: req.session.avata, us: req.session.username });
});
router.get("/product/cat/:id", (req, res) => {
  res.render("productId", { id: req.params.id, avata: req.session.avata, us: req.session.username });
});
router.get("/product/", (req, res) => {
  res.render("product", { avata: req.session.avata, us: req.session.username });
});
router.get("/profile", (req, res) => {
  res.render("profile", { avata: req.session.avata, us: req.session.username });
});

router.get("/apiuser/repass", (req, res) => {
  if (req.session.username) {
    res.render("repassword");
  } else {
    res.render("login");
  }

});

router.get("/fogetpass", (req, res) => {
  res.render("fogetpass");
});
router.get("/getfile", (req, res) => {
  res.render("file");
});
router.get("/fogetpassnew", (req, res) => {
  res.render("fogetpassnew", {er1: req.session.error1, er2: req.session.error2});
});


router.get("/product/detail/:id", (req, res) => {
  res.render("detail", { idsp: req.params.id,avata: req.session.avata, us: req.session.username });
});

router.get("/login", function (req, res, next) {
  if (req.session.username) {
    res.render("profile", { avata: req.session.avata, us: req.session.username });
  } else {
    res.render("login");
  }
});
router.get("/about", function (req, res, next) {
  res.render("vechungtoi", { avata: req.session.avata, us: req.session.username });
});
router.get("/register", function (req, res, next) {
  res.render("register");
});
router.post("/apiproduct/search", function (req, res, next) {
  res.render("search", { avata: req.session.avata, us: req.session.username });
});
router.get("/cart", function (req, res, next) {
  res.render("cart", { avata: req.session.avata, us: req.session.username });
});
module.exports = router;
