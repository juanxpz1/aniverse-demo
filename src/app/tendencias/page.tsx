import { getPopularAnime } from '@/lib/api/client';
import { AnimeCard } from '@/components/anime-card';
import { TrendingUp } from 'lucide-react';

export const revalidate = 3600;

export default async function TendenciasPage() {
  const animes = await getPopularAnime();

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 mt-16 pb-20">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/20">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold md:text-5xl">Animes en Tendencia</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Descubre cuáles son los animes más populares y comentados de la temporada. ¡No te quedes fuera de la conversación!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {animes.map((anime, index) => (
          <div key={anime.slug} className="relative group">
            {/* Ranking Badge */}
            <div className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-sm font-bold text-white shadow-lg">
              #{index + 1}
            </div>
            <AnimeCard anime={anime} />
          </div>
        ))}
      </div>
    </div>
  );
}
