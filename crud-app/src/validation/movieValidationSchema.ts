import * as yup from "yup";

// yup valiation schema for movie details
export const movieValidationSchema = () => {
  return yup.object({
    title: yup.string().strict().required("required"),
    director: yup.string().strict().required("required"),
    genre_id: yup.number().integer().required("required"),
    release_date: yup.date().required("required"),
    summary: yup.string().strict().required("required"),
  });
};
