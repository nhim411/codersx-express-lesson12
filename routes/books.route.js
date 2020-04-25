var express = require("express");
var router = express.Router();
const shortid = require("shortid");

var db = require("../db");
const controller = require('../controllers/books.controller');

//default books view and search
router.get("/", controller.index);

//delete book
router.get("/delete/:id", controller.delete);
//update book
router.get("/update/:id", controller.getUpdate);
router.post("/update/:id", controller.postUpdate);
//create new book
router.post("/create", controller.postCreate);

module.exports = router;
