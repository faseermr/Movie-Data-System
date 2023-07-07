export interface IMovie {
  id?: number;
  title: string;
  director: string;
  release_date: string;
  summary: string;
  genre_id?: number;
  movie_genres?: any;
}
