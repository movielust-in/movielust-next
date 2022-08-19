import axios from 'axios';

const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
});

tmdbClient.interceptors.request.use(
    (config) => {
        // inserts api key in request
        config.params = config.params || {};
        config.params.api_key = import.meta.env.VITE_TMDB_KEY;
        return config;
    },
    (error) => Promise.reject(error)
);

export default tmdbClient;
