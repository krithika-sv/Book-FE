import axios from "axios";
import { serverURL } from "./serverURL";


const axiosInstance = axios.create({
    baseURL: serverURL,
    timeout: 10000
})
// request interceptors : handling token append to Headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        console.log("inside")
        if (token) {
            config.headers.Authorization = `bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


//response interceptors
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("response received!!")
        return response
    },
    (error) => {
        console.log("error", error)
        if (error.response) {
            const status = error.response.status
            if (status == 401) {
                console.log("Unauthorised access - Redirect to Login");
            }
            else if (status == 404) {
                console.log("API not found");

            } else if (status == 500) {
                console.log("Server error");

            } else if (error.request) {
                console.log("No response from server");

            } else {
                console.log("Error....." + error.message);

            }
            return error
        }
    }
)
export default axiosInstance