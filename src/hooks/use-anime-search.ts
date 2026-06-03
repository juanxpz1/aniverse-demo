import useSWR from 'swr';
import { useDebounce } from 'use-debounce';
import { SearchResult } from '@/types/anime';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAnimeSearch(query: string, delay = 500) {
  const [debouncedQuery] = useDebounce(query, delay);

  const { data, error, isLoading } = useSWR<SearchResult>(
    debouncedQuery ? `/api/anime/search?q=${encodeURIComponent(debouncedQuery)}` : null,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  return {
    results: data?.animes || [],
    isLoading,
    isError: error,
    debouncedQuery,
  };
}
