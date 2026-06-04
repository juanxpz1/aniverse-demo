import { Anime, Episode, SearchResult, VideoServer, Genre } from '@/types/anime';
import { MOCK_ANIMES, MOCK_EPISODES, MOCK_GENRES, MOCK_LATEST_EPISODES } from './mock-data';

const API_URL = process.env.NEXT_PUBLIC_ANIME_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_ANIME_API_KEY;
const USE_MOCK = !API_URL;

/**
 * Helper to fetch data from the actual API
 */
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(API_KEY ? { 'x-api-key': API_KEY } : {}),
        ...options?.headers,
      },
      next: { revalidate: 3600, ...options?.next } // Default cache
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Get latest episodes
 */
export async function getLatestEpisodes(): Promise<Episode[]> {
  if (USE_MOCK) return MOCK_LATEST_EPISODES;
  try {
    return await fetchApi<Episode[]>('/latest');
  } catch {
    return MOCK_LATEST_EPISODES; // Fallback to mock on error
  }
}

/**
 * Get popular/trending anime
 */
export async function getPopularAnime(): Promise<Anime[]> {
  if (USE_MOCK) return MOCK_ANIMES.slice(0, 10);
  try {
    return await fetchApi<Anime[]>('/popular');
  } catch {
    return MOCK_ANIMES.slice(0, 10);
  }
}

/**
 * Search anime by query
 */
export async function searchAnime(query: string, page = 1): Promise<SearchResult> {
  if (USE_MOCK) {
    const queryLower = query.toLowerCase();
    const filtered = MOCK_ANIMES.filter(a => 
      a.title.toLowerCase().includes(queryLower) || 
      a.alternativeTitle?.toLowerCase().includes(queryLower)
    );
    return {
      animes: filtered,
      page: 1,
      totalPages: 1
    };
  }
  try {
    return await fetchApi<SearchResult>(`/search?q=${encodeURIComponent(query)}&page=${page}`);
  } catch {
    return { animes: [], page: 1, totalPages: 1 };
  }
}

/**
 * Get anime details by slug
 */
export async function getAnimeDetails(slug: string): Promise<Anime | null> {
  if (USE_MOCK) {
    return MOCK_ANIMES.find(a => a.slug === slug) || null;
  }
  try {
    return await fetchApi<Anime>(`/anime/${slug}`);
  } catch {
    return MOCK_ANIMES.find(a => a.slug === slug) || null;
  }
}

/**
 * Get episodes list for an anime
 */
export async function getAnimeEpisodes(slug: string): Promise<Episode[]> {
  if (USE_MOCK) {
    return MOCK_EPISODES[slug] || [];
  }
  try {
    return await fetchApi<Episode[]>(`/anime/${slug}/episodes`);
  } catch {
    return MOCK_EPISODES[slug] || [];
  }
}

/**
 * Get video streaming servers for an episode
 */
export async function getEpisodeServers(animeSlug: string, episodeNumber: number): Promise<VideoServer[]> {
  if (USE_MOCK) {
    return [
      { name: 'YourUpload', url: 'https://www.yourupload.com/embed/dummy', type: 'iframe' },
      { name: 'Mega', url: 'https://mega.nz/embed/dummy', type: 'iframe' },
      { name: 'Fembed', url: 'https://fembed.com/v/dummy', type: 'iframe' },
    ];
  }
  try {
    return await fetchApi<VideoServer[]>(`/anime/${animeSlug}/episodes/${episodeNumber}/servers`);
  } catch {
    return [
      { name: 'Mock Server 1', url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'mp4' }
    ];
  }
}

/**
 * Get all available genres
 */
export async function getGenres(): Promise<Genre[]> {
  if (USE_MOCK) return MOCK_GENRES;
  try {
    return await fetchApi<Genre[]>('/genres');
  } catch {
    return MOCK_GENRES;
  }
}
