import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// attach token
API.interceptors.request.use((config) => {
    const raw = localStorage.getItem("vvs_user");
    if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.token) {
            config.headers.Authorization = `Bearer ${parsed.token}`;
        }
    }
    return config;
});

export default API;
