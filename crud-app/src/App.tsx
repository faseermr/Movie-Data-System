import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./components/movie/MovieList";
import AddMovie from "./components/movie/AddMovie";
import UpdateMovie from "./components/movie/UpdateMovie";
import "./App.css";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/update-movie/:movie_id" element={<UpdateMovie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
