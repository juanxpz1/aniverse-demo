import { useLocalStorage } from './use-local-storage';
import { useCallback } from 'react';

export interface WatchProgress {
  animeSlug: string;
  animeTitle: string;
  episodeNumber: number;
  episodeSlug: string;
  coverImage: string;
  timestamp: number; // Current playback time in seconds
  duration: number; // Total duration in seconds
  lastWatchedAt: number; // Unix timestamp when last watched
  isCompleted: boolean;
}

export function useWatchHistory() {
  const [history, setHistory] = useLocalStorage<WatchProgress[]>('aniverse-history', []);

  const saveProgress = useCallback((progress: Omit<WatchProgress, 'lastWatchedAt'>) => {
    setHistory((prev) => {
      const existingIndex = prev.findIndex((p) => p.episodeSlug === progress.episodeSlug);
      const newProgress = { ...progress, lastWatchedAt: Date.now() };
      
      if (existingIndex >= 0) {
        const newHistory = [...prev];
        newHistory[existingIndex] = newProgress;
        // Sort to bring most recently watched to top
        return newHistory.sort((a, b) => b.lastWatchedAt - a.lastWatchedAt);
      }
      
      return [newProgress, ...prev];
    });
  }, [setHistory]);

  const getProgress = useCallback((episodeSlug: string) => {
    return history.find((p) => p.episodeSlug === episodeSlug) || null;
  }, [history]);

  const getContinueWatching = useCallback((limit = 10) => {
    // Filter out completed ones, or keep recently completed?
    // Let's just return the most recent ones
    return history.slice(0, limit);
  }, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const removeFromHistory = useCallback((episodeSlug: string) => {
    setHistory((prev) => prev.filter((p) => p.episodeSlug !== episodeSlug));
  }, [setHistory]);

  return {
    history,
    saveProgress,
    getProgress,
    getContinueWatching,
    clearHistory,
    removeFromHistory
  };
}
