import axios from "axios"
// import { baseUrl } from "constants";
export const baseUrl = "http://localhost:8000/api/"


export default axios.create({
    baseUrl: baseUrl,
});
