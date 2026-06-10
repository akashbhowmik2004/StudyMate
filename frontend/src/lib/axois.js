import axios from "axios";

const BASE_URL = "http://localhost:3000/auth";

export const auth = axios.create({
    baseURL: BASE_URL
})
