import axios from "axios";

const api = axios.create({
    withCredentials: true,
    baseURL: process.env.API_URL,
    headers: {
        "Access-Control-Allow-Credentials": true,
    },
});

api.interceptors.request.use((config) => {
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        console.log();
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url.split("/")[2] !== "refresh"
        ) {
            originalRequest._retry = true;
            const response = await api.post("/auth/refresh");
            if (response.status === 200) {
                return api(originalRequest);
            }
        }
        return error;
    }
);

export default api;
