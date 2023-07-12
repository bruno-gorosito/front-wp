import axios from "axios";

export const axiosClient = axios.create({
    // baseURL: "https://back-wp.onrender.com/api"
    baseURL: process.env.NEXT_PUBLIC_BACK_AXIOS
})