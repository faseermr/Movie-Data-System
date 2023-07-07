const express = require("express");
const cors = require("cors");
const db = require("./app/model/index");
const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const movieGenreRoutes = require("./app/routes/movie_genre.routes");
const movieRoutes = require("./app/routes/movie.routes");

app.use("/api/movie_genre", movieGenreRoutes);
app.use("/api/movie", movieRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
