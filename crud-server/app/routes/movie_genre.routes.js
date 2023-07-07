const express = require("express");
const router = express.Router();
const { findAll } = require("../controller/movie_genre.controller");

router.get("/", findAll);

module.exports = router;
