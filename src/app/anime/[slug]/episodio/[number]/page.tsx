import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ListVideo } from 'lucide-react';
import { getAnimeDetails, getEpisodeServers, getAnimeEpisodes } from '@/lib/api/client';
import { VideoPlayer } from '@/components/player/video-player';

export const revalidate = 3600;

export default async function EpisodePlayerPage({
  params,
}: {
  params: Promise<{ slug: string; number: string }>;
}) {
  const { slug, number } = await params;
  const episodeNumber = parseInt(number, 10);
  
  if (isNaN(episodeNumber)) {
    notFound();
  }

  const [anime, servers, episodes] = await Promise.all([
    getAnimeDetails(slug),
    getEpisodeServers(slug, episodeNumber),
    getAnimeEpisodes(slug)
  ]);

  if (!anime) {
    notFound();
  }

  const currentIndex = episodes.findIndex(e => e.number === episodeNumber);
  const prevEp = currentIndex > 0 ? episodes[currentIndex - 1] : null;
  const nextEp = currentIndex < episodes.length - 1 ? episodes[currentIndex + 1] : null;
  const currentEp = episodes[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8 md:px-8 md:py-12 mt-16">
      
      {/* Breadcrumbs & Header */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
          <span>/</span>
          <Link href={`/anime/${anime.slug}`} className="hover:text-primary transition-colors">{anime.title}</Link>
          <span>/</span>
          <span className="text-foreground">Episodio {episodeNumber}</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">
              {anime.title}
            </h1>
            <h2 className="text-lg text-muted-foreground">
              {currentEp?.title || `Episodio ${episodeNumber}`}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={prevEp ? `/anime/${anime.slug}/episodio/${prevEp.number}` : '#'}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                prevEp ? 'bg-white/5 hover:bg-white/10 text-foreground' : 'bg-transparent text-muted-foreground/50 pointer-events-none'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Link>
            <Link
              href={`/anime/${anime.slug}`}
              className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/10"
            >
              <ListVideo className="h-4 w-4" />
              <span className="hidden sm:inline">Lista</span>
            </Link>
            <Link
              href={nextEp ? `/anime/${anime.slug}/episodio/${nextEp.number}` : '#'}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                nextEp ? 'bg-primary text-white hover:bg-primary/90' : 'bg-white/5 text-muted-foreground/50 pointer-events-none'
              }`}
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Main Player Area */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <VideoPlayer servers={servers} poster={currentEp?.thumbnail || anime.banner || anime.cover} />
          
          {/* Controls below player */}
          <div className="flex items-center justify-between rounded-xl bg-white/5 p-4 border border-white/5">
            <div className="flex items-center gap-4">
              <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Reportar error
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>¿Te gusta?</span>
              <button className="rounded bg-white/10 px-3 py-1 text-primary hover:bg-primary/20 transition-colors">
                Me gusta
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Episodes */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-white/5 bg-card overflow-hidden">
            <div className="border-b border-white/5 bg-white/5 p-4">
              <h3 className="font-semibold text-foreground">Todos los Episodios</h3>
            </div>
            <div className="flex max-h-[600px] flex-col overflow-y-auto p-2 scrollbar-hide">
              {episodes.map((ep) => {
                const isActive = ep.number === episodeNumber;
                return (
                  <Link
                    key={ep.number}
                    href={`/anime/${anime.slug}/episodio/${ep.number}`}
                    className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    }`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
                      isActive ? 'bg-primary text-white' : 'bg-black/50'
                    }`}>
                      <span className="text-xs font-bold">{ep.number}</span>
                    </div>
                    <span className="text-sm font-medium line-clamp-1">
                      {ep.title || `Episodio ${ep.number}`}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
