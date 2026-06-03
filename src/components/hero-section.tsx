import Image from 'next/image';
import Link from 'next/link';
import { Anime } from '@/types/anime';
import { Play, Info } from 'lucide-react';

export function HeroSection({ featured }: { featured: Anime }) {
  return (
    <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Banner */}
      <div className="absolute inset-0">
        <Image
          src={featured.banner || featured.cover}
          alt={featured.title}
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* Gradient Overlay for blending into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      </div>

      <div className="container relative mx-auto flex h-full items-center px-4 pt-16 md:px-8">
        <div className="flex max-w-2xl flex-col gap-4 animate-in slide-in-from-bottom-8 duration-700">
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-primary px-2 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30">
              Destacado
            </span>
            <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium backdrop-blur-md">
              {featured.type}
            </span>
            <span className="rounded bg-white/10 px-2 py-1 text-xs font-medium backdrop-blur-md">
              ⭐ {featured.rating}
            </span>
          </div>

          <h1 className="font-outfit text-4xl font-extrabold leading-tight tracking-tighter text-white md:text-6xl lg:text-7xl">
            {featured.title}
          </h1>

          <p className="line-clamp-3 text-sm text-foreground/80 md:text-base lg:line-clamp-4 lg:text-lg">
            {featured.synopsis}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link 
              href={`/anime/${featured.slug}/episodio/1`}
              className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition-all hover:scale-105 hover:bg-white/90"
            >
              <Play className="h-5 w-5 fill-current" />
              Ver Ahora
            </Link>
            
            <Link 
              href={`/anime/${featured.slug}`}
              className="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
            >
              <Info className="h-5 w-5" />
              Más Información
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {featured.genres.map((genre) => (
              <span key={genre} className="flex items-center gap-2">
                {genre}
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50 last:hidden" />
              </span>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
