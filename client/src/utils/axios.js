import axios from 'axios';

const makeRequest = axios.create(
    {
        baseURL:import.meta.env.VITE_API_HOST,
        withCredentials:true
    }
);

export default makeRequest;