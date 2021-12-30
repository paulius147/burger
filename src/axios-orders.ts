import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://reactts-burger-builder-project-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
