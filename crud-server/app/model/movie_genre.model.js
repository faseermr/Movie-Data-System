module.exports = (sequelize, DataTypes) => {
  const MovieGenre = sequelize.define("movie_genre", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return MovieGenre;
};
