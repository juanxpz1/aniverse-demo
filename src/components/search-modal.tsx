'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { useAppStore } from '@/store/app-store';
import { useAnimeSearch } from '@/hooks/use-anime-search';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function SearchModal() {
  const router = useRouter();
  const { isSearchModalOpen, setSearchModalOpen } = useAppStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { results, isLoading } = useAnimeSearch(query);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchModalOpen(true);
      }
      if (e.key === 'Escape' && isSearchModalOpen) {
        setSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen, setSearchModalOpen]);

  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in"
        onClick={() => setSearchModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 mx-4 flex flex-col max-h-[80vh]">
        
        {/* Search Input */}
        <div className="flex items-center border-b border-white/5 px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            className="flex h-16 w-full rounded-md bg-transparent px-4 py-3 text-lg outline-none placeholder:text-muted-foreground"
            placeholder="Buscar animes (Ej. Solo Leveling, Naruto...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          ) : query ? (
            <button onClick={() => setQuery('')} className="p-1 hover:text-foreground text-muted-foreground">
              <X className="h-5 w-5" />
            </button>
          ) : (
            <button onClick={() => setSearchModalOpen(false)} className="rounded bg-white/5 px-2 py-1 text-xs font-medium text-muted-foreground">
              ESC
            </button>
          )}
        </div>

        {/* Results */}
        <div className="overflow-y-auto p-2 scrollbar-hide">
          {query.trim() === '' ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
              Escribe algo para empezar a buscar.
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col gap-1">
              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
                Resultados
              </h3>
              {results.slice(0, 8).map((anime) => (
                <Link
                  key={anime.slug}
                  href={`/anime/${anime.slug}`}
                  onClick={() => setSearchModalOpen(false)}
                  className="flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-white/5 group"
                >
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={anime.cover}
                      alt={anime.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <h4 className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
                      {anime.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded bg-white/10 px-1.5 py-0.5">{anime.type}</span>
                      <span>{anime.year}</span>
                      <span className="truncate">{anime.genres.join(', ')}</span>
                    </div>
                  </div>
                </Link>
              ))}
              
              {results.length > 8 && (
                <button
                  onClick={() => {
                    setSearchModalOpen(false);
                    router.push(`/explorar?q=${encodeURIComponent(query)}`);
                  }}
                  className="mt-2 w-full rounded-lg bg-primary/10 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  Ver todos los resultados
                </button>
              )}
            </div>
          ) : !isLoading ? (
            <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            {`No se encontraron resultados para "${query}"`}
            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
