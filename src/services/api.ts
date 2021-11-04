import axios from "axios";

const api = axios.create({
    baseURL: 'https://andersondfm.com.br/apiClient/'
});

export default api;