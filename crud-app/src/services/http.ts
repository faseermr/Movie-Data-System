import Axios from "axios";

// axios configuration
export default Axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-type": "application/json",
  },
});
