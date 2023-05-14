import axios from "axios";

export const apiHost = process.env.VUE_APP_API_HOST;
export const apiPort = process.env.VUE_APP_API_PORT;
export const apiURL = `${apiHost}:${apiPort}`;

const apiService = axios.create({
    baseURL: `${apiHost}:${apiPort}`,
});

apiService.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("user-token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiService;
