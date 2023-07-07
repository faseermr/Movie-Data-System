const express = require("express");
const router = express.Router();
const {
  create,
  findAll,
  update,
  deleteById,
  findById,
} = require("../controller/movie.controller");

// create new movies
router.post("/", create);

// get all movies
router.get("/", findAll);

// get movie by id
router.get("/:id", findById);

// update movie data
router.put("/update/:id", update);

// delete movie details
router.delete("/delete/:id", deleteById);

module.exports = router;
