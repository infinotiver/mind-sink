// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
});

apiClient.interceptors.request.use((config) => {
    const token =
      import.meta.env.VITE_APP_TEST_ACCESS_TOKEN ||
      (typeof localStorage !== "undefined"
        ? localStorage.getItem("token")
        : null);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        throw new Error("No access token found. Please set REACT_APP_TEST_ACCESS_TOKEN in your .env file or log in.");
    }
    return config;
});

export default apiClient;
