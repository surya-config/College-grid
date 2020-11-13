import axios from "axios";
// Next we make an 'instance' of it
const instance = axios.create({
  // .. where we make our configurations
  baseURL: "http://localhost:8000",
});

export default instance;
