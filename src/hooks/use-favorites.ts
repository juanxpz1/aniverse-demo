import { Anime } from '@/types/anime';
import { useLocalStorage } from './use-local-storage';
import { useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Anime[]>('aniverse-favorites', []);

  const addFavorite = useCallback((anime: Anime) => {
    setFavorites((prev) => {
      if (prev.some((a) => a.slug === anime.slug)) return prev;
      return [anime, ...prev];
    });
  }, [setFavorites]);

  const removeFavorite = useCallback((slug: string) => {
    setFavorites((prev) => prev.filter((a) => a.slug !== slug));
  }, [setFavorites]);

  const toggleFavorite = useCallback((anime: Anime) => {
    setFavorites((prev) => {
      const isFavorited = prev.some((a) => a.slug === anime.slug);
      if (isFavorited) {
        return prev.filter((a) => a.slug !== anime.slug);
      }
      return [anime, ...prev];
    });
  }, [setFavorites]);

  const isFavorite = useCallback((slug: string) => {
    return favorites.some((a) => a.slug === slug);
  }, [favorites]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
