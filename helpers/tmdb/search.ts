import axios from "../tmdbClient";
import { SearchMultiResponse } from "../../types/tmdb";
import { SEARCH } from "../Urls";

const search = (query: string): Promise<SearchMultiResponse> =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await axios.get<SearchMultiResponse>(SEARCH(query));
        resolve(res.data);
      } catch (err) {
        reject();
      }
    })();
  });

export default search;
