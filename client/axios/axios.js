import axios from "axios";

axios.defaults.baseURL = "http://localhost:7050/api/v1";
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");