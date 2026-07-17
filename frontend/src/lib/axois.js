import axios from "axios";

export const auth = axios.create({
    baseURL: "http://localhost:3000/auth",
    withCredentials: true
})

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})