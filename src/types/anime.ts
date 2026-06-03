export interface Anime {
  slug: string;
  title: string;
  alternativeTitle?: string;
  cover: string;
  banner?: string;
  synopsis: string;
  genres: string[];
  status: string; // Emisión, Finalizado, etc.
  type: string; // TV, Película, OVA, etc.
  year: string | number;
  rating: number;
  totalEpisodes?: number;
}

export interface Episode {
  number: number;
  title?: string;
  thumbnail?: string;
  slug: string; // Ej: naruto-shippuden-1
  animeSlug: string;
}

export interface VideoServer {
  name: string;
  url: string;
  type: 'iframe' | 'direct' | 'hls' | 'mp4';
}

export interface Genre {
  name: string;
  slug: string;
  count?: number;
}

export interface SearchResult {
  animes: Anime[];
  page: number;
  totalPages: number;
}
