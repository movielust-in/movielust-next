import axios, { AxiosInstance } from 'axios';

const get = <T = any>(url: string): Promise<T> =>
    axios
        .get<T>(url)
        .then((response) => response)
        .catch((error) => error);

/**
 * Executes array of requests parallely. When using to call tmdb api pass tmdbClient as second argument
 * @param urls - List of urls
 * @param axiosInstance - Axios instance to use when executing requests.
 * @returns Promise[]
 */
const getAll = <T = any>(urls: string[], axiosInstance: AxiosInstance = axios): Promise<T[]> =>
    new Promise((resolve, reject) => {
        axios
            .all<T>(urls.map((url) => axiosInstance.get(url)))
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            });
    });

export { get, getAll };
