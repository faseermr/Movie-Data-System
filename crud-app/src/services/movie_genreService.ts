import http from "./http";

// to get all movie genre details
const getAllMovieGenre = () => {
  return http.get(`/movie_genre`);
};

export default {
  getAllMovieGenre,
};
