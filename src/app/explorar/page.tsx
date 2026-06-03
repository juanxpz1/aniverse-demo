'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AnimeCard } from '@/components/anime-card';
import { SkeletonCard } from '@/components/skeleton-card';
import { useAnimeSearch } from '@/hooks/use-anime-search';
import { Search } from 'lucide-react';
import { useState } from 'react';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const { results, isLoading } = useAnimeSearch(query);

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 mt-16">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Explorar Animes</h1>
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por título..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-foreground outline-none transition-all focus:border-primary focus:bg-white/10"
          />
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Filters Sidebar - Simplified for mock */}
        <div className="w-full shrink-0 md:w-64 flex flex-col gap-6">
          <div className="rounded-xl border border-white/5 bg-card p-5">
            <h3 className="mb-4 font-semibold">Filtros</h3>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">Estado</label>
                <select className="w-full rounded-md border border-white/10 bg-black/50 p-2 text-sm text-foreground outline-none">
                  <option value="">Todos</option>
                  <option value="emision">En Emisión</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </div>
              
              <div>
                <label className="mb-2 block text-sm text-muted-foreground">Tipo</label>
                <select className="w-full rounded-md border border-white/10 bg-black/50 p-2 text-sm text-foreground outline-none">
                  <option value="">Todos</option>
                  <option value="tv">TV</option>
                  <option value="movie">Película</option>
                  <option value="ova">OVA</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((anime) => (
                <AnimeCard key={anime.slug} anime={anime} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-medium">No se encontraron resultados</h3>
              <p className="mt-2 text-muted-foreground">Intenta con otros términos de búsqueda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-20"><Search className="animate-spin h-8 w-8 text-primary" /></div>}>
      <ExploreContent />
    </Suspense>
  );
}
