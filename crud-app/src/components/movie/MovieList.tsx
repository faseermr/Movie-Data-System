import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IMovie } from "../../model/Movie";
import movieService from "../../services/movieService";
import CustomPagination from "../pagination/CustomPagination";
import AddMovieButton from "./AddMovieButton";
import ShowEntries from "../pagination/ShowEntries";
import SingleMovieCard from "./SingleMovieCard";

const MovieList: React.FC = () => {
  const [moviesList, setMoviesList] = useState<IMovie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(4);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();

  const getAllMovies = async (page: any, size: any) => {
    const response = await movieService.getAllMovies(page, size);
    setMoviesList(response.data.rows);
    setTotalPages(response.data.totalPages);
  };

  useEffect(() => {
    getAllMovies(currentPage, pageSize);
  }, [currentPage, pageSize, totalPages]);

  return (
    <div className="card">
      <div className="card-header p-3 fw-bold">Movie Data Application</div>
      <div className="card-body">
        <div className="d-flex justify-content-between ">
          <ShowEntries setPageSize={setPageSize} pageSize={pageSize} />
          <AddMovieButton />
        </div>
        {moviesList.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-between">
            {moviesList.map((movie, idx) => {
              return (
                <SingleMovieCard
                  key={idx}
                  movie={movie}
                  getAllMovies={getAllMovies}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              );
            })}
          </div>
        ) : (
          <h2>No Result</h2>
        )}
      </div>
      <div className="card-footer d-flex justify-content-center p-2">
        {moviesList.length > 0 ? (
          <CustomPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MovieList;
