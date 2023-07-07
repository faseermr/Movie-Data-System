const dbConfig = require("../config/dbConfig");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movies = require("./movie.model")(sequelize, DataTypes);
db.movie_genres = require("./movie_genre.model")(sequelize, DataTypes);

db.movie_genres.hasMany(db.movies, { foreignKey: "genre_id", as: "movies" });
db.movies.belongsTo(db.movie_genres, {
  foreignKey: "genre_id",
  as: "movie_genres",
});

const initialDbData = () => {
  db.movie_genres.create({
    name: "Action",
  });
  db.movie_genres.create({
    name: "Adventure",
  });
  db.movie_genres.create({
    name: "Comedy",
  });
  db.movie_genres.create({
    name: "Horror",
  });
  db.movie_genres.create({
    name: "Other",
  });

  db.movies.create({
    title: "TestAction1",
    director: "ActionDirector1",
    release_date: "20/12/2023",
    summary: "summary 1",
    genre_id: 1,
  });

  db.movies.create({
    title: "TestComedy1",
    director: "ComedyDirector1",
    release_date: "08/10/2023",
    summary: "summary 2",
    genre_id: 3,
  });
};

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db correctly");
    // initialDbData();
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

module.exports = db;
