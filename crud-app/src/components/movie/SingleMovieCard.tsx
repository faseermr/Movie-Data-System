import React from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../model/Movie";
import movieService from "../../services/movieService";

type PropType = {
  movie: IMovie;
  getAllMovies: (page: any, size: any) => Promise<void>;
  currentPage: number;
  pageSize: number;
};

const SingleMovieCard: React.FC<PropType> = ({
  movie,
  getAllMovies,
  currentPage,
  pageSize,
}) => {
  const navigate = useNavigate();

  const deleteMovie = async (id: any) => {
    try {
      let option = window.confirm("Are you want to delete");
      if (option) {
        const res = await movieService.deleteById(id);
        getAllMovies(currentPage, pageSize);
        alert(res.data.message);
      }
    } catch (error) {}
  };
  return (
    <div className="card  movie-card">
      <div className="card-header d-flex justify-content-between">
        <p className="fw-bold"> {movie.title}</p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-success mx-2"
            onClick={() => navigate(`/update-movie/${movie.id}`)}
          >
            Edit
          </button>
          <button
            type="submit"
            className="btn btn-outline-danger"
            onClick={() => deleteMovie(movie.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col">
            {" "}
            <label className=" border-bottom border-2 border-warning fw-bold">
              Director:
            </label>
            <p>{movie.director}</p>
          </div>
          <div className="col">
            <label className=" border-bottom border-2 border-warning fw-bold">
              Genre:
            </label>
            <p>{movie.movie_genres.name}</p>{" "}
          </div>
          <div className="col">
            <label className=" border-bottom border-2 border-warning fw-bold">
              Release Date:
            </label>
            <p>{movie.release_date}</p>{" "}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label className=" border-bottom border-2 border-warning fw-bold">
              Summary:
            </label>
            <p>{movie.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleMovieCard;
