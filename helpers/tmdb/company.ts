import axios from '../tmdbClient';
import { COMPANIES, COMPANIESIMAGES } from '../Urls';
import { CompanyImagesResponse, ProductionCompany } from '../../types/tmdb';

export const fetchCompanies = (id: string): Promise<ProductionCompany> =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.get<ProductionCompany>(COMPANIES(id));
                if (res.status !== 200) reject();
                resolve(res.data);
            } catch (err) {
                reject();
            }
        })();
    });

export const fetchCompaniesImages = (id: string): Promise<CompanyImagesResponse> =>
    new Promise((resolve, reject) => {
        (async () => {
            try {
                const res = await axios.get<CompanyImagesResponse>(COMPANIESIMAGES(id));
                if (res.status !== 200) reject();
                resolve(res.data);
            } catch (err) {
                reject();
            }
        })();
    });
