export interface Avatar {
    id: number;
    link: string;
}

export interface AvatarResponse {
    avatars: Avatar[];
}

export interface IMDBRating {
    id: string;
    success: boolean;
    rating: number;
    votes: number;
}

export interface ImdbRating {
    id: string;
    rating: number;
    vote_count: number;
}

export interface ImdbRatingsRes {
    result: boolean;
    results: ImdbRating[];
}

export interface Magnet {
    magnet?: string;
    torrent?: string;
    quality?: string;
    size?: string;
}

export interface MagnetResponse {
    results: Magnet[];
}
