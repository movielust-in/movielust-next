export interface ContactFormInterface {
    name: string;
    email: string;
    message: string;
}

export interface SingUpDataInterface {
    name: string;
    email: string;
    profile: string;
    password: string;
}

export interface Filters {
    genres: number[];
    year: number;
    sortBy: string;
}
