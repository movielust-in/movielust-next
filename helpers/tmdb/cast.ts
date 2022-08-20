import axios from '../tmdbClient';
import { GETCAST } from '../Urls';

export const Casts = (id: string | number, type: string) =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.get(GETCAST(id, type));
                if (res.status !== 200) reject();

                resolve(res.data);
            } catch (err) {
                reject();
            }
        })();
    });
