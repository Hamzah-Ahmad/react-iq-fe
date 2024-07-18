import axios from "axios";

export default axios.create({
    baseURL: 'http://localhost:4010'
})

export const axiosPrivate = axios.create({
    baseURL:  "http://localhost:4010",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})  