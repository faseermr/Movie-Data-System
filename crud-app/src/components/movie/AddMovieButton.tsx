import { useNavigate } from "react-router-dom";

const AddMovieButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="btn btn-primary mx-2"
      onClick={() => navigate(`/add-movie`)}
    >
      Add Movie
    </button>
  );
};

export default AddMovieButton;
