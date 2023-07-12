import axios from "axios";

export const axiosClient = axios.create({
    // baseURL: "https://back-wp.onrender.com/api"
    baseURL: "http://localhost:4960/api"
})