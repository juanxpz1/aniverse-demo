import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Play, Heart, Share2, Calendar, LayoutGrid, Clock, Star } from 'lucide-react';
import { getAnimeDetails, getAnimeEpisodes, getPopularAnime } from '@/lib/api/client';
import { AnimeCarousel } from '@/components/anime-carousel';

export const revalidate = 3600;

export default async function AnimeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const anime = await getAnimeDetails(slug);
  
  if (!anime) {
    notFound();
  }

  const [episodes, recommendations] = await Promise.all([
    getAnimeEpisodes(slug),
    getPopularAnime()
  ]);

  return (
    <div className="flex flex-col pb-20">
      {/* Banner & Header */}
      <div className="relative w-full">
        <div className="absolute inset-0 h-[40vh] md:h-[50vh]">
          <Image
            src={anime.banner || anime.cover}
            alt={anime.title}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 pt-32 md:px-8 md:pt-48">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Poster */}
            <div className="relative mx-auto w-48 shrink-0 md:mx-0 md:w-64 lg:w-72">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-primary/20">
                <Image
                  src={anime.cover}
                  alt={anime.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 pt-4 md:pt-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-2 py-1 text-xs font-bold uppercase tracking-wider text-white ${
                  anime.status === 'Emisión' ? 'bg-green-600' : 'bg-primary'
                }`}>
                  {anime.status}
                </span>
                <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium backdrop-blur-md">
                  {anime.type}
                </span>
                <span className="flex items-center gap-1 rounded bg-white/10 px-2 py-1 text-xs font-medium backdrop-blur-md">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {anime.rating}
                </span>
              </div>

              <div>
                <h1 className="font-outfit text-3xl font-bold md:text-5xl lg:text-6xl">
                  {anime.title}
                </h1>
                {anime.alternativeTitle && (
                  <h2 className="mt-1 text-lg text-muted-foreground">
                    {anime.alternativeTitle}
                  </h2>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{anime.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <LayoutGrid className="h-4 w-4" />
                  <span>{anime.totalEpisodes || episodes.length} Episodios</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <Link 
                    key={genre} 
                    href={`/generos/${genre.toLowerCase().replace(/ /g, '-')}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs transition-colors hover:border-primary/50 hover:bg-primary/10"
                  >
                    {genre}
                  </Link>
                ))}
              </div>

              <p className="mt-2 text-sm leading-relaxed text-foreground/80 md:text-base max-w-4xl">
                {anime.synopsis}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link 
                  href={`/anime/${anime.slug}/episodio/1`}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  <Play className="h-5 w-5 fill-current" />
                  Ver Episodio 1
                </Link>
                
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 hover:text-red-400">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 hover:text-blue-400">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="container mx-auto mt-16 px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Episodios
            <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </h2>
        </div>

        {episodes.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {episodes.map((episode) => (
              <Link 
                key={episode.number}
                href={`/anime/${anime.slug}/episodio/${episode.number}`}
                className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:border-primary/50 hover:bg-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/50 text-sm font-bold text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-white">
                    {episode.number}
                  </div>
                  <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                    {episode.title || `Episodio ${episode.number}`}
                  </span>
                </div>
                <Play className="h-5 w-5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-white/5 bg-white/5 py-12 text-center">
            <Clock className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">No hay episodios disponibles</h3>
            <p className="text-sm text-muted-foreground">Este anime aún no tiene episodios publicados.</p>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="mt-16">
        <div className="container mx-auto px-4 md:px-8">
          <AnimeCarousel 
            title="Recomendaciones" 
            animes={recommendations.filter(a => a.slug !== anime.slug).slice(0, 10)} 
          />
        </div>
      </div>
    </div>
  );
}
