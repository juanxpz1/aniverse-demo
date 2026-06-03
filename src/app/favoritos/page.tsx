'use client';

import { useFavorites } from '@/hooks/use-favorites';
import { AnimeCard } from '@/components/anime-card';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function FavoritosPage() {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 mt-16 pb-20 min-h-[70vh]">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg shadow-pink-500/20">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Mis Favoritos</h1>
          <p className="text-muted-foreground">Tu colección personal de animes</p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((anime) => (
            <div key={anime.slug} className="relative group">
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 py-20 text-center">
          <Heart className="mb-4 h-16 w-16 text-muted-foreground opacity-20" />
          <h2 className="text-2xl font-bold text-foreground">Aún no tienes favoritos</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Explora nuestro catálogo y haz clic en el corazón para guardar tus animes favoritos aquí y acceder a ellos rápidamente.
          </p>
          <Link 
            href="/explorar" 
            className="mt-6 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-primary/90"
          >
            Explorar Catálogo
          </Link>
        </div>
      )}
    </div>
  );
}
