import axios from 'axios';

/**
 * @deprecated
 */
const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

tmdbClient.interceptors.request.use(
  (config) => {
    // inserts api key in request
    config.params = config.params || {};
    config.params.api_key = '2a7d4498c790ee971ae3369d0327d57c';
    return config;
  },
  (error) => Promise.reject(error)
);

export default tmdbClient;
