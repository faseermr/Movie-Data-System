const db = require("../model/index");
const {
  getPagination,
  getPagingData,
} = require("../utilities/sequalizeUtilities");
const Movie = db.movies;
const MovieGenre = db.movie_genres;
const Op = db.Sequelize.Op;

// create new movies
exports.create = async (req, res) => {
  try {
    const newMovie = {
      title: req.body.title,
      director: req.body.director,
      release_date: req.body.release_date,
      summary: req.body.summary,
      genre_id: req.body.genre_id,
    };

    const response = await Movie.create(newMovie);
    res.status(200).json({ response, message: "Movie added successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// get all movies
exports.findAll = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    console.log(limit, offset);
    const movies = await Movie.findAndCountAll({
      limit: limit,
      offset: offset,
      attributes: { exclude: ["createdAt", "updatedAt"] },
      //include: "movie_genres",
      include: [
        {
          model: MovieGenre,
          as: "movie_genres",
          attributes: ["id", "name"],
        },
      ],
      order: [["id", "desc"]],
    });
    const response = getPagingData(movies, page, limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// to get movie by id
exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByPk(id, { include: "movie_genres" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// update movie data
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateMovie = {
      title: req.body.title,
      director: req.body.director,
      release_date: req.body.release_date,
      summary: req.body.summary,
      genre_id: req.body.genre_id,
    };

    const response = await Movie.update(updateMovie, {
      where: { id },
    });

    if (response == 1) {
      res.send({
        message: "Movie was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update Movie with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// delete movie details
exports.deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Movie.destroy({ where: { id } });
    if (response == 1) {
      res.send({
        message: "Movie was deleted successfully.",
      });
    } else {
      res.send({
        message: `Cannot delete Movie with id=${id}.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
