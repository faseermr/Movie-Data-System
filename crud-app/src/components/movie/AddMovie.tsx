import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { IMovie } from "../../model/Movie";
import { movieValidationSchema } from "../../validation/movieValidationSchema";
import movieService from "../../services/movieService";
import movie_genreService from "../../services/movie_genreService";

const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  const [movie_genres, setMovie_genres] = useState([]);
  const [initialValues, setInitialValues] = useState<IMovie>({
    title: "",
    director: "",
    genre_id: undefined,
    release_date: "",
    summary: "",
  });

  const formik = useFormik({
    initialValues,
    validationSchema: movieValidationSchema,
    onSubmit: async (movie) => {
      const res = await movieService.create({
        title: movie.title,
        director: movie.director,
        genre_id: movie.genre_id,
        release_date: movie.release_date,
        summary: movie.summary,
      });
      alert(res.data.message);
      navigate("/");
    },
  });

  const getAllMovieGenre = async () => {
    try {
      const res = await movie_genreService.getAllMovieGenre();
      setMovie_genres(res.data.rows);
    } catch (error) {}
  };

  useEffect(() => {
    getAllMovieGenre();
  }, []);
  return (
    <div className="card">
      <div className="card-header  p-3 fw-bold">Add Movie</div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <label className="text-primary fw-bold">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-danger ml-4">{formik.errors.title}</div>
              ) : null}{" "}
            </div>
            <div className="col-6">
              <label className="text-primary fw-bold">Director</label>
              <input
                type="text"
                className="form-control"
                name="director"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.director && formik.errors.director ? (
                <div className="text-danger ml-4">{formik.errors.director}</div>
              ) : null}{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label className="text-primary fw-bold">Genre</label>
              <select
                className="form-select"
                name="genre_id"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              >
                <option selected disabled>
                  --Select One--
                </option>
                {movie_genres.map((v: any, i: any) => {
                  return (
                    <option key={i} value={v.id}>
                      {v.name}
                    </option>
                  );
                })}
              </select>
              {formik.touched.genre_id && formik.errors.genre_id ? (
                <div className="text-danger ml-4">{formik.errors.genre_id}</div>
              ) : null}{" "}
            </div>
            <div className="col-6">
              <label className="text-primary fw-bold">Release Date</label>
              <input
                type="date"
                className="form-control"
                max={new Date().toISOString().split("T")[0]}
                name="release_date"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.release_date && formik.errors.release_date ? (
                <div className="text-danger ml-4">
                  {formik.errors.release_date}
                </div>
              ) : null}{" "}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label className="text-primary fw-bold">Summary</label>
              <textarea
                className="form-control"
                name="summary"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.summary && formik.errors.summary ? (
                <div className="text-danger ml-4">{formik.errors.summary}</div>
              ) : null}{" "}
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-end">
            <button className="btn text-primary" onClick={() => navigate(`/`)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary ml-2">
              Add Movie
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
