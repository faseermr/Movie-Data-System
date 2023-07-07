const db = require("../model/index");
const {
  getPagination,
  getPagingData,
} = require("../utilities/sequalizeUtilities");
const MovieGenre = db.movie_genres;
const Op = db.Sequelize.Op;

// get all movie genre type
exports.findAll = async (req, res) => {
  // const { page, size } = req.query;
  // const { limit, offset } = getPagination(page, size);
  const allMovieGenre = await MovieGenre.findAndCountAll({
    // limit: limit,
    // offset: offset,
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  //const response = getPagingData(allMovieGenre, page, limit);
  res.status(200).json(allMovieGenre);
};
