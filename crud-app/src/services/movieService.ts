import http from "./http";

// to get all movie details
const getAllMovies = (page: any, size: any) => {
  return http.get(`/movie?page=${page}&size=${size}`);
};

// to add new movies
const create = (data: any) => {
  return http.post(`/movie`, data);
};

// to get single movie details
const getById = (id: any) => {
  return http.get(`/movie/${id}`);
};

// update movie details
const update = (id: any, data: any) => {
  return http.put(`/movie/update/${id}`, data);
};

// delete movie details
const deleteById = (id: any) => {
  return http.delete(`/movie/delete/${id}`);
};

export default {
  getAllMovies,
  create,
  update,
  getById,
  deleteById,
};
